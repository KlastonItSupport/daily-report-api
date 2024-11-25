import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelFilterService {
  constructor() {}

  async getCertifications(search: string) {
    const certifications = await this.fetchExcelData(
      'https://docs.google.com/spreadsheets/d/1cr_Ew782sRAmZQcV9op7aWYHUeJcSt6g15Q9k5eyEOE/edit?gid=0#gid=0',
    );

    const filteredCertifications = certifications.filter(
      (certification) => certification['CERT NUMBER'] === search,
    );

    return filteredCertifications[0];
  }
  async fetchExcelData(url: string): Promise<any[]> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });

      const workbook = XLSX.read(response.data, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: Array<Array<any>> = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });

      const columnNames = [
        'LINE NUMBER',
        'CERT NUMBER',
        'STANDARD',
        'COMPANY NAME',
        'SCOPE',
        'COMPANY ADD',
        'ISSUE DATE',
        'STATUS',
        'CERT VALIDATE',
      ];

      const [, ...rows] = data;

      const result = rows.map((row) => {
        const rowObject: Record<string, any> = {};

        for (let i = 0; i < columnNames.length; i++) {
          rowObject[columnNames[i]] = row[i] !== undefined ? row[i] : null;
        }

        return rowObject;
      });

      delete result[0];
      return result.filter((item) =>
        Object.entries(item)
          .filter(([key]) => key !== 'LINE NUMBER')
          .some(([, value]) => value !== null),
      );
    } catch (error) {
      throw new Error(`Erro ao processar o arquivo Excel: ${error.message}`);
    }
  }
}
