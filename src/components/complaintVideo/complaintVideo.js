import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'; // Only works in older React Native versions

const ComplaintVideo = ({ videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>🎥 वीडियो:</Text>
      
      <TouchableOpacity onPress={() => setShowVideo(true)} style={styles.button}>
        <Text style={styles.buttonText}>🎬 वीडियो देखें</Text>
      </TouchableOpacity>

      {showVideo && (
        <WebView
          source={{
            html: `
              <html>
              <body style="margin:0;padding:0;">
                <video width="100%" height="100%" controls autoplay>
                  <source src="${videoUrl}" type="video/mp4">
                  आपका ब्राउज़र वीडियो को सपोर्ट नहीं करता।
                </video>
              </body>
              </html>
            `,
          }}
          style={styles.video}
          allowsFullscreenVideo={true} 
          mediaPlaybackRequiresUserAction={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center', },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor: '#ffffff', padding: 10, borderRadius: 5 },
  buttonText: { color: 'black', fontSize: 16 },
  video: { width: 300, height: 200, backgroundColor: 'black' },
});

export default ComplaintVideo;
