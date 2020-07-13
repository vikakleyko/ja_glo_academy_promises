document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const promise = () => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            
            if (request.readyState !== 4) {
                return;
            }
            
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        resolve(item);
                    }
                    if (select.value === 'no') {
                        reject('Произошла ошибка');
                    }
                });
            } else {
                reject('Произошла ошибка');
            }
        });
    });

    select.addEventListener('change', () => {
        promise()
        .then(resp => {
            output.innerHTML = `Тачка ${resp.brand} ${resp.model} <br>
                        Цена: ${resp.price}$`;
        })
        .catch(error => {
            output.innerHTML = error;
        });
    
    });

});