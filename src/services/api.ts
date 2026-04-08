import axios from "axios";

export interface SplitFile {
  file_name: string;
  file_path: string;
}

export interface SplitResponse {
  message: string;
  total_files: number;
  files: SplitFile[];
}

export interface OCRPage {
  page_number: number;
  raw_text: string;
}

export interface OCRResponse {
  source_file: string;
  total_pages: number;
  pages: OCRPage[];
}

const apiClient = axios.create({
  baseURL: "/api",
});

export const pdfService = {
  splitPdf: async (file: File): Promise<SplitResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<SplitResponse>("/split-pdf", formData);
    return response.data;
  },

  extractText: async (file: File): Promise<OCRResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<OCRResponse>("/extract-text", formData);
    return response.data;
  },
};

export default apiClient;