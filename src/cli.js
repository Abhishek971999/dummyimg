#!/usr/bin/env node
require('dotenv').config()

const program = require("commander");
const chalk = require("chalk");
const fs = require('fs');
const request = require('request');

const BASE_URL=process.env.BASE_URL

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

program
  .version("1.0.0")
  .description("CLI to get placeholder images on demand for projects");

program
  .command("get <width> [height] [text] [filename]")
  .description(`Get placeholder images. Width is a required parameter. Height, Text on image and filename are optional.If only width is defined, height would be the same as width.Filename will be random if not mentioned.`)
  .action((width,height,text,filename) => {
      
    const widthOfImg = width
    const heightOfImg = height!=undefined?height:width
    const fileName = filename!=undefined?filename:`${widthOfImg}x${heightOfImg}`
    const textOnImg = text!=undefined?text:`Placeholder`
    const generatedUrl = `${BASE_URL}/${widthOfImg}x${heightOfImg}?text=${textOnImg}`

    download(generatedUrl, `${fileName}.png`, function(){
        console.log(chalk.cyan(`Placeholder Image Downloaded !`));
      });
  })

  program.parse(process.argv);