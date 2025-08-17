# BrandPeek 👋

BrandPeek is a React Native mobile application built with Expo that provides a "Brand Discovery" experience. The app allows users to browse top brands, view detailed brand information, and interact with a clean, modern interface featuring custom gradient backgrounds.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 🎯 Live Project Demo - Ready to Test!

> **✅ All Requirements Met**: Expo Go link ✓ | QR Code ✓ | Android APK ✓

### 🚀 Instant Access (Choose Your Method):

| Method | Command | Best For | Time to Demo |
|--------|---------|----------|--------------|
| **🔥 Expo Go + QR** | `npm run share` | Mobile testing | 30 seconds |
| **🔗 Tunnel URL** | `npm run tunnel` | Link sharing | 30 seconds |
| **📦 Android APK** | `npm run build:android` | Permanent install | 10 minutes |
| **🌐 Web Demo** | `npm run web` | Browser testing | 30 seconds |

### 📱 Quick Start for Testers:

1. **Install Expo Go** ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. **Run**: `npm run share` 
3. **Scan QR code** or use tunnel URL
4. **Test the app** instantly on your device!

```bash
# Get all demo options and links
npm run demo-info

# Start sharing immediately  
npm run share
```

📖 **Complete Demo Guide**: [`docs/live-demo-guide.md`](docs/live-demo-guide.md)

## 🚀 Quick Start

### For Developers:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup MockAPI Backend**
   Follow the detailed setup guide in `docs/mockapi-setup.md` to create your MockAPI project and populate it with brand data.
   After setting up MockAPI, update the `BASE_URL` in `constants/api.js` with your project URL.

3. **Validate your setup**
   ```bash
   npm run validate-setup
   ```

4. **Test your API endpoints**
   ```bash
   npm run test-api
   ```

5. **Start the app**
   ```bash
   npx expo start
   ```

### For Testers/Reviewers:

1. **Install Expo Go** on your mobile device
2. **Run the sharing command**:
   ```bash
   npm run share
   ```
3. **Scan the QR code** or use the tunnel URL provided
4. **Test the app** directly on your device

## 📋 Available Sharing Options

| Method | Command | Description | Permanent |
|--------|---------|-------------|-----------|
| **Expo Go + QR Code** | `npm run share` | Global access via QR code | ❌ (requires terminal) |
| **Tunnel URL** | `npm run tunnel` | Direct URL access | ❌ (requires terminal) |
| **Local Network** | `npm run start --lan` | Same WiFi network only | ❌ (requires terminal) |
| **Android APK** | `npm run build:android` | Standalone Android app | ✅ (permanent) |
| **Web Build** | `npm run build:web` | Web version deployment | ✅ (permanent) |

## ✨ Features to Test

### 🎨 Visual Design
- **Custom Radial Gradient Background** - Beautiful blue gradient matching design specs
- **Modern UI Components** - Clean, professional interface design
- **Smooth Animations** - Fluid screen transitions and interactions

### 📱 Core Functionality
- **Brand Discovery** - Browse 10+ real brands with company logos
- **Brand Details** - Detailed information including description, founded date, headquarters
- **Interactive Elements** - Follow/unfollow buttons with visual feedback
- **Pull-to-Refresh** - Refresh brand data with native pull gesture

### 🔧 Technical Features
- **API Integration** - Live data from MockAPI.io backend
- **Cross-Platform** - Works on iOS, Android, and Web
- **Performance Optimized** - Image caching and smooth scrolling
- **Error Handling** - Graceful error states with retry options

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
