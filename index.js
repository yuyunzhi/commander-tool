#!/usr/bin/env node
console.log('hello world')

const program = require('commander');
const inquirer = require('inquirer');

const consola = require('consola');

// 生成二维码
const qrcode = require('qrcode-terminal');

const XPUtil = require('./util');
const pkg = require('./package.json');


const getInfomation = () => {
    const prompt = [

        {
            type: 'input',
            name: 'userName',
            message: '用户名：',
        },
        {
            type: 'password',
            name: 'password',
            message: '密码：',
            mask: '🐨',
            validate: value => value.length > 0 || '密码不能为空'
        },
        {
            type: 'list',
            message: '请选择一种水果:',
            name: 'fruit',
            choices: [
                "Apple",
                "Pear",
                "Banana"
            ],
            filter: function (val) { // 使用filter将回答变为小写
                return val.toLowerCase();
            }
        },
        {
            type: "confirm",
            message: "是否使用监听？",
            name: "watch",
            prefix: "前缀"
        },
    ];

    inquirer.prompt(prompt).then(({ userName, password,watch,fruit}) => {
        console.log('恭喜你登录的账号和密码是',userName, password,watch,fruit);

    });
};

/**
 * 输入获取参数处理
 */
program
    .command('params')
    .alias('p')
    .description('输入获取用户信息')
    .action(() => {
        getInfomation();
    });

/**
 * 输入字符串生成二维码
 */
program
    .command('generate [link]')
    .alias('g')
    .description('输入英文地址生成二维码')
    .action((link, cmd) => {

        if( !link ){
            console.error('error',link)
        }
        else{
            const qrcodeUrl = link
            qrcode.generate(qrcodeUrl, {
                small: true
            });
            consola.success(`生成二维码成功。\n\n${qrcodeUrl}`)
        }
    })

/**
 * 发送请求获取结果
 */
program
    .command('send [path]')
    .alias('s')
    .option('-e, --enter <value>', '入口参数', val => {
        return val;
    })
    .description('获取URL发送请求')
    .action((path, cmd ) => {
        console.log(1111);
        console.log('path',path);
        console.log('cmd',cmd);
    });

/**
 * 必须有 help
 */
program
    .helpOption('-h, --help', '查看帮助信息')
    .usage('<command> [options]')
    .parse(process.argv);

// 如果没有传入参数，输出帮助
if (!process.argv.slice(2).length) {
    program.help();
}
