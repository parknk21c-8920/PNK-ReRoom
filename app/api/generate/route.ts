import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { ROOM_TYPES, STYLES } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits, id')
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: '사용자 정보를 확인할 수 없습니다.' }, { status: 401 });
    }

    if (profile.credits <= 0) {
      return NextResponse.json({ error: '크레딧이 부족합니다. 요금제 페이지에서 충전해 주세요.', redirect: '/pricing' }, { status: 403 });
    }

    const { image, roomTypeId, styleId } = await req.json();

    if (!image || !roomTypeId || !styleId) {
      return NextResponse.json(
        { error: '필수 데이터(이미지, 공간, 스타일)가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const roomType = ROOM_TYPES.find(r => r.id === roomTypeId);
    const style = STYLES.find(s => s.id === styleId);

    // Replicate ControlNet용 프롬프트
    const prompt = `A highly detailed, photorealistic interior design of a ${roomType?.prompt || 'room'}. Style: ${style?.prompt || 'modern'}. 8k resolution, highly detailed, beautiful lighting.`;

    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: '서버에 Replicate API 키가 설정되지 않았습니다. .env.local 파일을 확인해 주세요.' },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: apiKey,
    });

    // adirik/interior-design 모델 (ControlNet MLSD 기반) 호출
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475ceea858cb665f7fed0a2701d37caa5eb5957e1",
      {
        input: {
          image: image, // Base64 data URI
          prompt: prompt,
          a_prompt: "best quality, extremely detailed, photo from Pinterest, interior, cinematic lighting",
          n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
          image_resolution: 512,
        }
      }
    );

    // output은 대개 생성된 이미지 URL의 배열(보통 1개)을 반환합니다.
    const resultImageUrl = Array.isArray(output) ? output[1] || output[0] : output;

    if (!resultImageUrl) {
      return NextResponse.json(
        { error: '이미지 생성에 실패했습니다. 다른 이미지로 시도해 주세요.' },
        { status: 500 }
      );
    }

    // URL에서 이미지를 다운로드하여 base64로 변환 (기존 프론트엔드 호환성을 위해)
    const imgRes = await fetch(resultImageUrl);
    const arrayBuffer = await imgRes.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    // 💡 크레딧 차감 로직
    await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('id', profile.id);

    return NextResponse.json({ image: base64Image, credits: profile.credits - 1 });
  } catch (error: any) {
    console.error('Replicate API Error:', error);
    
    if (error?.message?.includes('Unauthenticated')) {
      return NextResponse.json({ error: '올바르지 않은 Replicate API 키입니다.' }, { status: 401 });
    }

    return NextResponse.json(
      { error: '인테리어 생성 중 오류가 발생했습니다. (Replicate API)' },
      { status: 500 }
    );
  }
}
