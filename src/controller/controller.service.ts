import { Injectable } from '@nestjs/common';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import * as moment from "moment";
import { join } from 'path';

const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

let csvToJson = require('convert-csv-to-json');

@Injectable()
export class ControllerService {
async create(createControllerDto: any) {

    let csvAray= [];
    const localLink: string = await 'uploads/'+createControllerDto;

    console.log(localLink)
    // return localLink;
    const myInputFile = await path.join(process.cwd(), localLink);

    console.log(myInputFile)
    // const fileOutputName = 'myOutputFile.json';
    let json = await csvToJson.getJsonFromCsv(myInputFile);
    for(let i=0; i<json.length;i++){
      await csvAray.push(json[i])
    }

    const pupetter =  await this.pupetter(csvAray);
    return pupetter;
  }

  async pupetter(json:{}){

    const today2: any = await moment().format("YYYY-MM-DD_HH:mm:ss");
    const templateHtml = await fs.readFileSync(path.join(process.cwd(), 'view/index.html'), 'utf8');
    const template = await handlebars.compile(templateHtml);
    const html = await template({init: json});
    const fileName = await today2;
    const localLink = await path.join(process.cwd(), `download/${fileName}`);

    console.log(localLink);

    //REMOTE CHROME CONVERTER
    //   const browser = await puppeteer.launch({
    // executablePath: '/usr/bin/chromium-browser',
    //   args: [
    //     '--no-sandbox',
    //     '--disable-gpu',
    //     '--headless',
    //   ],
    // });

    // LOCAL CHROME CONVERTER
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--use-gl=egl'],
    });

    console.log('browser');

    const page = await browser.newPage()
    await page.setContent(html, {
      waitUntil: 'domcontentloaded'
    })

    console.log('page');
    // create a pdf buffer
    const pdfBuffer = await page.pdf({
      fontFamily: 'sans-serif',
      fontWeight: 100,
      format: 'A4',
      // width: '1010px',
      headerTemplate: "<p></p>",
      footerTemplate: "<p></p>",
      displayHeaderFooter: false,
      margin: {
        top: "0px",
        bottom: "20px",
      },
      printBackground: true,
      path: path.join(process.cwd(), 'download/new_generated.pdf'),
    })

    console.log('pdfBuffer');
 
    await browser.close();
    return {status: 200, title: 'success', message: 'qdf generated succefully', data: path.join(process.cwd(), 'download/new_generated.pdf')}
    // const upload = await this.uploadFileToAws({name: fileName, type: 'statement', data:pdfBuffer});
  }

  findAll() {
    return `This action returns all controller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} controller`;
  }

  update(id: number, updateControllerDto: UpdateControllerDto) {
    return `This action updates a #${id} controller`;
  }

  remove(id: number) {
    return `This action removes a #${id} controller`;
  }
}
