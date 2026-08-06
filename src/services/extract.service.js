import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function extractApplication(image, text) {
  if (!image && !text) {
    throw new Error('Image or text is required');
  }

  const model = 'gemini-2.5-flash';
  const prompt = `Ekstrak informasi lowongan kerja dari input berikut. 
    Jika input berupa gambar, analisis gambarnya. Jika teks, analisis teksnya.
    Ekstrak data dalam format JSON yang rapi.
    
    PENTING: Gunakan bahasa asli (bahasa riil/original language) dari dokumen yang diunggah untuk mengisi nilai-nilai field (seperti job_title, description, qualifications, dsb). JANGAN melakukan penerjemahan otomatis (auto-translate). Jika dokumen dalam bahasa Inggris, hasil ekstraksi field harus tetap dalam bahasa Inggris. Jika dokumen dalam bahasa Indonesia, tetap dalam bahasa Indonesia.

    Field yang diekstrak:
    - jobTitle: Judul pekerjaan (Gunakan bahasa asli dokumen)
    - company: Nama perusahaan
    - location: Lokasi (Kota/Kabupaten/Provinsi - Gunakan bahasa asli dokumen)
    - description: Deskripsi singkat tentang pekerjaan (Gunakan bahasa asli dokumen)
    - qualifications: List kualifikasi yang dibutuhkan (Gunakan bahasa asli dokumen)
    - salary: Informasi gaji (jika ada, jika tidak tulis 'Not specified')
    - contact: Informasi kontak atau link pendaftaran (jika ada)`;

  const contents = [];

  if (image) {
    const mimeType = image.match(/data:([^;]+);base64/)?.[1] || 'image/png';
    const base64Data = image.split(',')[1] || image;
    contents.push({
      parts: [
        { inlineData: { data: base64Data, mimeType: mimeType } },
        { text: prompt },
      ],
    });
  } else {
    contents.push({
      parts: [{ text: `${prompt}\n\nTEKS:\n${text}` }],
    });
  }

  const result = await ai.models.generateContent({
    model,
    contents: contents[0],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          company: { type: Type.STRING },
          location: { type: Type.STRING },
          description: { type: Type.STRING },
          qualifications: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          salary: { type: Type.STRING },
          contact: { type: Type.STRING },
        },
        required: [
          'jobTitle',
          'company',
          'location',
          'description',
          'qualifications',
          'salary',
        ],
      },
    },
  });

  return JSON.parse(result.text || '{}');
}
