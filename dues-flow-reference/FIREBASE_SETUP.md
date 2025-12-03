# Firebase Setup Guide

## Files Created
- `firestore.rules` - Security rules for Firestore
- `firebase.json` - Firebase project configuration
- `firestore.indexes.json` - Firestore indexes configuration

## How to Deploy Rules

### Option 1: Using Firebase Console (Manual)
1. Go to [Firebase Console](https://console.firebase.google.com/project/waitlist-9f029)
2. Navigate to **Firestore Database** → **Rules**
3. Copy the contents of `firestore.rules`
4. Paste into the rules editor
5. Click **Publish**

### Option 2: Using Firebase CLI (Recommended)
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Security Rules Explanation

The rules in `firestore.rules` allow:
- **Read and write access** to the `waitlist` collection
- **No access** to other collections (secure by default)

This is perfect for a waitlist form where you want to collect submissions but keep other data secure.

## Testing the Rules

After deploying the rules, try submitting the form again. It should work without permission errors.

## Production Considerations

For production, you might want to add additional security:
- Rate limiting
- Data validation
- User authentication
- IP restrictions

Let me know if you need help with any of these advanced features! 