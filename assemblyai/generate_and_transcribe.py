import requests
import json
import base64
import os
import sys
import time
import wave

# إعدادات واجهات برمجة التطبيقات
GEMINI_API_KEY = "AIzaSyBRKEvKp-8MnPQc8yBZoDRUTbZgPqDrT38"
ASSEMBLYAI_API_KEY = "f50eb6912be44b3a9c86a7b9309174c1"

# إعدادات Gemini
GEMINI_MODEL = "gemini-2.5-flash-preview-tts"

# إعدادات AssemblyAI
UPLOAD_ENDPOINT = "https://api.assemblyai.com/v2/upload"
TRANSCRIPT_ENDPOINT = "https://api.assemblyai.com/v2/transcript"
ASSEMBLY_HEADERS = {
    "authorization": ASSEMBLYAI_API_KEY,
    "content-type": "application/json"
}

def generate_audio_from_text(text, output_file="gemini_voice.wav", voice_name="Aoede"):
    """
    الخطوة 1: تحويل النص إلى صوت باستخدام Gemini API
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
    
    headers = {"Content-Type": "application/json"}
    
    data = {
        "contents": [{"parts": [{"text": text}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice_name 
                    }
                }
            }
        }
    }
    
    print(f"[{time.strftime('%H:%M:%S')}] جاري توليد الصوت باستخدام Gemini ({voice_name})...")
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        response_data = response.json()
        try:
            parts = response_data["candidates"][0]["content"]["parts"]
            for part in parts:
                if "inlineData" in part and part["inlineData"]["mimeType"].startswith("audio/"):
                    audio_base64 = part["inlineData"]["data"]
                    
                    # فك التشفير وتحويل PCM الخام إلى WAV قابل للتشغيل
                    audio_bytes = base64.b64decode(audio_base64)
                    with wave.open(output_file, 'wb') as wav_file:
                        wav_file.setnchannels(1) # Mono
                        wav_file.setsampwidth(2) # 16-bit
                        wav_file.setframerate(24000) # 24000Hz
                        wav_file.writeframes(audio_bytes)
                        
                    print(f"✅ تم إنشاء وحفظ الملف الصوتي بنجاح: {output_file}")
                    return output_file
            
            print("❌ لم يتم العثور على بيانات صوتية في الرد المرجوع من جيميناي.")
            return None
        except KeyError:
            print("❌ تنسيق الرد غير متوقع من Gemini.")
            return None
    else:
        print(f"❌ حدث خطأ في Gemini API (الكود {response.status_code}): {response.text}")
        return None


def upload_audio_to_assemblyai(file_path):
    """
    الخطوة 2: رفع الملف الصوتي إلى AssemblyAI
    """
    print(f"[{time.strftime('%H:%M:%S')}] جاري رفع الملف الصوتي {file_path} إلى خوادم AssemblyAI...")
    
    def read_file(file_path, chunk_size=5242880):
        with open(file_path, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data: break
                yield data

    try:
        response = requests.post(
            UPLOAD_ENDPOINT,
            headers=ASSEMBLY_HEADERS,
            data=read_file(file_path)
        )
        
        if response.status_code == 200:
            upload_url = response.json()['upload_url']
            print(f"✅ تم الرفع بنجاح!")
            return upload_url
        else:
            print(f"❌ فشل الرفع: {response.text}")
            return None
    except Exception as e:
        print(f"❌ خطأ أثناء الرفع: {e}")
        return None


def transcribe_audio(audio_url):
    """
    الخطوة 3: بدء عملية التفريغ الصوتي (استخراج النص مع التواقيت) باللغة العربية
    """
    data = {
        "audio_url": audio_url,
        "language_code": "ar",
        # يمكنك إضافة خيارات متقدمة من AssemblyAI هنا إذا أردت
        # "word_boost": ["كلمات", "خاصة"]
    }
    
    print(f"[{time.strftime('%H:%M:%S')}] جاري بدء عملية استخراج النص والتواقيت...")
    response = requests.post(TRANSCRIPT_ENDPOINT, json=data, headers=ASSEMBLY_HEADERS)
    
    if response.status_code == 200:
        return response.json()['id']
    else:
        print(f"❌ فشل بدء التفريغ الصوتي: {response.text}")
        return None


def poll_transcript_result(transcript_id):
    """
    الخطوة 4: الاستعلام عن حالة التفريغ الصوتي حتى يكتمل
    """
    polling_endpoint = f"{TRANSCRIPT_ENDPOINT}/{transcript_id}"
    print(f"[{time.strftime('%H:%M:%S')}] في انتظار اكتمال معالجة الصوت...")
    
    while True:
        response = requests.get(polling_endpoint, headers=ASSEMBLY_HEADERS)
        
        if response.status_code == 200:
            data = response.json()
            status = data['status']
            
            if status == 'completed':
                print(f"✅ اكتملت المعالجة بنجاح!")
                return data
            elif status == 'error':
                print(f"❌ فشل التفريغ الصوتي: {data['error']}")
                return None
            else:
                print(f"   المنصة تعالج الصوت الآن... الانتظار 3 ثوانٍ...")
                time.sleep(3)
        else:
            print(f"❌ خطأ أثناء فحص الحالة: {response.text}")
            return None

def save_json(data, filename):
    """حفظ البيانات في ملف JSON مرتب"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"✅ تم حفظ خريطة التواقيت والنص بالكامل في: {filename}")


if __name__ == "__main__":
    # النص الافتراضي الذي نريد تحويله إلى صوت ثم تفريغه
    sample_text = """
    مرحباً بالجميع. في هذا الفيديو القصير، نختبر قدرة الذكاء الاصطناعي 
    على توليد ملف صوتي بجودة عالية، ثم إرساله لاحقاً لتحليله واستخراج دقيق للكلمات وتوقيت ظهورها.
    هذه العملية مفيدة جداً لصناعة مقاطع الفيديو الاحترافية.
    """
    
    output_audio_path = os.path.join(os.path.dirname(__file__), "final_generated_voice.wav")
    output_json_path = os.path.join(os.path.dirname(__file__), "final_transcript.json")
    
    print("="*60)
    print("     بدء نظام توليد الصوت والتفريغ (Gemini + AssemblyAI)   ")
    print("="*60)
    
    # [1] توليد الصوت من النص عبر Gemini
    generated_audio_file = generate_audio_from_text(sample_text, output_file=output_audio_path)
    
    if generated_audio_file:
        time.sleep(1) # استراحة قصيرة جداً
        
        # [2] رفع الصوت الذي تم توليده إلى AssemblyAI
        uploaded_audio_url = upload_audio_to_assemblyai(generated_audio_file)
        
        if uploaded_audio_url:
            # [3] طلب عملية التفريغ باللغة العربية
            transcript_task_id = transcribe_audio(uploaded_audio_url)
            
            if transcript_task_id:
                # [4] جلب وتنزيل النتيجة النهائية
                final_result = poll_transcript_result(transcript_task_id)
                
                if final_result:
                    # [5] حفظ النتيجة
                    save_json(final_result, output_json_path)
                    
                    print("\n" + "="*60)
                    print(f"النص النهائي المستخرج:")
                    print("="*60)
                    print(final_result.get('text', ''))
                    print("="*60)
                    print("اكتملت جميع العمليات بنجاح! 🎉")
