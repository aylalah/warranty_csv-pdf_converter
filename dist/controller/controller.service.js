"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
let csvToJson = require('convert-csv-to-json');
let ControllerService = class ControllerService {
    async create(createControllerDto) {
        let csvAray = [];
        const localLink = await 'uploads/' + createControllerDto;
        console.log(localLink);
        const myInputFile = await path.join(process.cwd(), localLink);
        console.log(myInputFile);
        let json = await csvToJson.getJsonFromCsv(myInputFile);
        for (let i = 0; i < json.length; i++) {
            await csvAray.push(json[i]);
        }
        const pupetter = await this.pupetter(csvAray);
        return pupetter;
    }
    async pupetter(json) {
        const today2 = await moment().format("YYYY-MM-DD_HH:mm:ss");
        const templateHtml = await fs.readFileSync(path.join(process.cwd(), 'view/index.html'), 'utf8');
        const template = await handlebars.compile(templateHtml);
        const html = await template({ init: json });
        const fileName = await today2;
        const localLink = await path.join(process.cwd(), `download/${fileName}`);
        console.log(localLink);
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--use-gl=egl'],
        });
        console.log('browser');
        const page = await browser.newPage();
        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        });
        console.log('page');
        const pdfBuffer = await page.pdf({
            fontFamily: 'sans-serif',
            fontWeight: 100,
            format: 'A4',
            headerTemplate: "<p></p>",
            footerTemplate: "<p></p>",
            displayHeaderFooter: false,
            margin: {
                top: "0px",
                bottom: "20px",
            },
            printBackground: true,
            path: path.join(process.cwd(), 'download/new_generated.pdf'),
        });
        console.log('pdfBuffer');
        await browser.close();
        return { status: 200, title: 'success', message: 'qdf generated succefully', data: path.join(process.cwd(), 'download/new_generated.pdf') };
    }
    findAll() {
        return `This action returns all controller`;
    }
    findOne(id) {
        return `This action returns a #${id} controller`;
    }
    update(id, updateControllerDto) {
        return `This action updates a #${id} controller`;
    }
    remove(id) {
        return `This action removes a #${id} controller`;
    }
};
ControllerService = __decorate([
    (0, common_1.Injectable)()
], ControllerService);
exports.ControllerService = ControllerService;
//# sourceMappingURL=controller.service.js.map