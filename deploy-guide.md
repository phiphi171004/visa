# Hướng Dẫn Deploy Ứng Dụng Web Lên Server Miễn Phí

## 🚀 Các Platform Miễn Phí Tốt Nhất

### 1. **Netlify** (Khuyến nghị)
- ✅ **Miễn phí hoàn toàn**
- ✅ **Deploy tự động từ GitHub**
- ✅ **HTTPS miễn phí**
- ✅ **CDN toàn cầu**
- ✅ **Custom domain miễn phí**

**Cách deploy:**
1. Vào [netlify.com](https://netlify.com)
2. Đăng ký/đăng nhập
3. Click "New site from Git"
4. Kết nối GitHub repository
5. Deploy tự động

### 2. **Vercel**
- ✅ **Miễn phí hoàn toàn**
- ✅ **Deploy nhanh**
- ✅ **HTTPS miễn phí**
- ✅ **CDN toàn cầu**

**Cách deploy:**
1. Vào [vercel.com](https://vercel.com)
2. Đăng ký/đăng nhập
3. Import project từ GitHub
4. Deploy tự động

### 3. **GitHub Pages**
- ✅ **Miễn phí hoàn toàn**
- ✅ **Tích hợp với GitHub**
- ✅ **HTTPS miễn phí**

**Cách deploy:**
1. Push code lên GitHub
2. Vào Settings > Pages
3. Chọn source branch
4. Deploy tự động

### 4. **Firebase Hosting**
- ✅ **Miễn phí 10GB/tháng**
- ✅ **HTTPS miễn phí**
- ✅ **CDN toàn cầu**

### 5. **Surge.sh**
- ✅ **Miễn phí hoàn toàn**
- ✅ **Deploy nhanh từ terminal**

## 📋 Chuẩn Bị Deploy

### Bước 1: Tạo GitHub Repository
```bash
# Khởi tạo Git
git init

# Thêm files
git add .

# Commit
git commit -m "Initial commit: Cursor Trial Helper"

# Tạo repository trên GitHub và push
git remote add origin https://github.com/yourusername/cursor-trial-helper.git
git push -u origin main
```

### Bước 2: Tạo file cấu hình (tùy chọn)

**Cho Netlify:**
```html
<!-- _redirects file -->
/*    /index.html   200
```

**Cho Vercel:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎯 Hướng Dẫn Chi Tiết

### Option 1: Netlify (Khuyến nghị)

1. **Tạo GitHub repository:**
   - Vào [github.com](https://github.com)
   - Click "New repository"
   - Đặt tên: `cursor-trial-helper`
   - Chọn Public
   - Click "Create repository"

2. **Upload code lên GitHub:**
   - Upload tất cả files: `index.html`, `style.css`, `script.js`, `README.md`
   - Commit và push

3. **Deploy trên Netlify:**
   - Vào [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Chọn GitHub
   - Chọn repository `cursor-trial-helper`
   - Click "Deploy site"

4. **Kết quả:**
   - URL: `https://your-site-name.netlify.app`
   - HTTPS miễn phí
   - CDN toàn cầu

### Option 2: Vercel

1. **Tạo GitHub repository** (như trên)

2. **Deploy trên Vercel:**
   - Vào [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import từ GitHub
   - Chọn repository
   - Click "Deploy"

3. **Kết quả:**
   - URL: `https://your-site-name.vercel.app`
   - HTTPS miễn phí
   - CDN toàn cầu

### Option 3: GitHub Pages

1. **Tạo GitHub repository** (như trên)

2. **Enable GitHub Pages:**
   - Vào repository Settings
   - Scroll xuống "Pages"
   - Chọn source: "Deploy from a branch"
   - Chọn branch: "main"
   - Click "Save"

3. **Kết quả:**
   - URL: `https://yourusername.github.io/cursor-trial-helper`
   - HTTPS miễn phí

## 🔧 Tối Ưu Hóa

### 1. Thêm Meta Tags
```html
<meta name="description" content="Cursor Trial Helper - Tạo thẻ ảo miễn phí">
<meta name="keywords" content="cursor, trial, virtual card, free">
<meta property="og:title" content="Cursor Trial Helper">
<meta property="og:description" content="Tạo thẻ ảo miễn phí cho Cursor Free Trial">
```

### 2. Thêm Favicon
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

### 3. Tối ưu Performance
- Minify CSS và JS
- Optimize images
- Enable gzip compression

## 📱 Test Trên Mobile

Sau khi deploy, test trên:
- Desktop browsers
- Mobile browsers
- Tablet browsers

## 🎉 Kết Quả

Sau khi deploy thành công, bạn sẽ có:
- ✅ **Website hoạt động** trên internet
- ✅ **HTTPS miễn phí**
- ✅ **CDN toàn cầu**
- ✅ **Custom domain** (nếu muốn)
- ✅ **Auto-deploy** khi update code

---

**Sáng tạo bởi PHI PHI** ❤️
