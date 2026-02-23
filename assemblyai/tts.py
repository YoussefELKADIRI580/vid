import requests
import json
import base64
import os

# مفتاح API الخاص بك للوصول إلى Gemini
API_KEY = "AIzaSyBRKEvKp-8MnPQc8yBZoDRUTbZgPqDrT38"

# استخدام النموذج المخصص لتحويل النص إلى صوت
MODEL = "gemini-2.5-flash-preview-tts"

def text_to_speech_gemini(text, output_file="output.wav", voice_name="Aoede"):
    """
    تحويل النص إلى صوت باستخدام Gemini API
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    data = {
        "contents": [{
            "parts": [{"text": text}]
        }],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        # الأصوات المتاحة حالياً في جيميناي تشمل:
                        # Pck, Charon, Kore, Fenrir, Aoede
                        "voiceName": voice_name 
                    }
                }
            }
        }
    }
    
    print(f"جاري تحويل النص إلى صوت باستخدام نموذج {MODEL}...")
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        response_data = response.json()
        try:
            # استخراج محتوى الصوت (Base64) من رد جيميناي
            # الرد يحتوي عادة على text بالإضافة إلى inlineData للصوت
            parts = response_data["candidates"][0]["content"]["parts"]
            audio_saved = False
            
            for part in parts:
                if "inlineData" in part and part["inlineData"]["mimeType"].startswith("audio/"):
                    mime_type = part["inlineData"]["mimeType"]
                    print(f"نوع الصوت المُرجع من جيميناي: {mime_type}")
                    audio_base64 = part["inlineData"]["data"]
                    
                    # فك تشفير المحتوى
                    audio_bytes = base64.b64decode(audio_base64)
                    
                    # بناء ملف WAV من بيانات PCM الخام
                    # Gemini يعيد الصوت بصيغة: audio/L16;codec=pcm;rate=24000
                    import wave
                    with wave.open(output_file, 'wb') as wav_file:
                        wav_file.setnchannels(1) # Mono channel
                        wav_file.setsampwidth(2) # 16-bit PCM (L16 = 2 bytes)
                        wav_file.setframerate(24000) # معدل أخذ العينات 24000
                        wav_file.writeframes(audio_bytes)
                        
                    print(f"✅ تم حفظ الصوت بنجاح في وملف قابل للتشغيل: {os.path.abspath(output_file)}")
                    audio_saved = True
                    break
            
            if not audio_saved:
                print("❌ لم يتم العثور على بيانات صوتية في الرد. تأكد من أن النموذج يدعم إخراج الصوت.")
                print(json.dumps(response_data, indent=2))
                return None
                
            return output_file
            
        except KeyError as e:
            print("❌ تنسيق الرد غير متوقع:")
            print(json.dumps(response_data, indent=2))
            return None
    else:
        print(f"❌ حدث خطأ (الكود {response.status_code}):")
        print(response.text)
        return None

if __name__ == "__main__":
    # نص تجريبي باللغة العربية
    sample_text = "مرحباً بك! هذا اختبار لخدمة تحويل النص إلى كلام باستخدام نموذج جيميناي المتطور لإنشاء الصوتيات."
    
    # تحديد مسار ملف الإخراج
    output_path = os.path.join(os.path.dirname(__file__), "gemini_voice.wav")
    
    # استدعاء الدالة
    # يمكنك تجربة أصوات أخرى بتغيير المتغير voice_name إلى (Puck, Charon, Kore, Fenrir)
    text_to_speech_gemini(sample_text, output_file=output_path, voice_name="Aoede")
