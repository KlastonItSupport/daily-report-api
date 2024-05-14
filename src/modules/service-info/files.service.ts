import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor() {}
  async createFIle(imageDataURL: string, reportId: string) {
    const base64Image = imageDataURL.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const filePath = `${process.env.UPLOAD_FOLDER_PATH}/signature-${reportId}.png`;

    fs.writeFileSync(filePath, imageBuffer);

    return {
      message: 'Imagem salva com sucesso!',
      path: filePath,
    };
  }

  async deleteFile(reportId: string) {
    const filePath = `${process.env.UPLOAD_FOLDER_PATH}/signature-${reportId}.png`;

    try {
      fs.unlinkSync(filePath);
      return {
        message: 'Arquivo deletado com sucesso!',
        path: filePath,
      };
    } catch (error) {
      return {
        error: 'Erro ao deletar o arquivo',
        message: error.message,
      };
    }
  }
}
