'use strict';

function getRepos(user) {

    const apiURL = `https://api.github.com/users/${user}/repos`;

    fetch(apiURL)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something is amiss: ${err.message}`);
        $('#results').addClass('hidden');
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    clearResults();

    for(let i = 0; i < responseJson.length; i++) {
        $('.results-list').append(
            `<li><h2>${responseJson[i].full_name}</h2>
            <a href="${responseJson[i].html_url}" target="_blank"><p>${responseJson[i].html_url}</p></a>
            </li>`
        )};
 
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(e => {
        e.preventDefault();
        clearResults();
        const user = $(".user").val();
        displayName(user);
        getRepos(user);
    });
}

function clearResults() {
    $('.results-list').empty();
    $('#js-error-message').empty();
}

function displayName (user) {
    $('.handle').text(`${user}`);
}

$(function() {
    console.log("Let's see some repos");

    watchForm();
})