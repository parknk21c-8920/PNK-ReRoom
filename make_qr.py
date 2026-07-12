import qrcode
from PIL import Image

url = "https://pnk-re-room.vercel.app"
print(f"Generating QR code for production URL: {url}")

logo_path = "public/logo.jpg"
output_path = "public/qr_with_logo.png"

# Generate QR code
qr = qrcode.QRCode(
    version=5,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=15,
    border=2,
)
qr.add_data(url)
qr.make(fit=True)

# Create QR code image
img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

# Load and resize logo
try:
    logo = Image.open(logo_path)
    
    # Make logo round (optional, just using the provided jpg directly)
    # The image is a jpg, so let's just resize and paste it.
    
    # Calculate dimensions
    logo_size = int(min(img.size[0], img.size[1]) * 0.25)
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Calculate position
    pos = (
        (img.size[0] - logo_size) // 2,
        (img.size[1] - logo_size) // 2
    )
    
    # Paste logo
    img.paste(logo, pos)
    print(f"QR code with logo successfully created at {output_path}")
except Exception as e:
    print("Could not load logo, creating standard QR code.", e)

img.save(output_path)
