import './styles/index.scss'
import $ from "jquery";
import 'bootstrap';


const userStack = {
    language: 'JavaScript',
    framework: 'Angular'
};

const user = {
    name: 'Jon',
    age: '35',
    ...userStack
};

$('.block').html('Jquery is working');

console.log(user);