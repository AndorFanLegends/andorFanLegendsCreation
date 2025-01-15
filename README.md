# Andor Fan Legends Creation App

Online : https://andorfanlegendcreator.web.app/

## General Description
A vue App to create Andor Fan legend.
The App helps :
* to create a Json format that can be integrate into https://andorfanlegends.web.app 
* [In progress] Legend in Json format can be loaded for PDF printing

## About printing
Currently, AFLC use html2PDf to generate a PDF, The PDF is only a image mode, text not selectable.
In future, I hope text will selectable to help translation, minimize PDF Size, and to be more suitable for reading

## Available languages
<ul>
  <li><b>FR </b> : About 86 captions (2025/01/15). Most are translations from the German forum, and present on BoardGameGeek.</li>
  <li><b>EN </b> : About 8 legends found in BoardGameGeek. To set up and prove the result in English. It's up to you :)</li>
  <li><b>DE </b> : Around 260 Fan captions were referenced from the German forum in December 2023.  They redirect only to the download link. Now it's your turn.</li>
</ul>

## Want to add new Language ?  
<ul>
  <li>Create new language Json in src/locales with same variables</li>
  <li>Create a few legends in your own language, and add in a new language folder in publlic/legends/</li>
  <li>Then Pull Request :)</li>
</ul>

## Adding Legends and prepare
  After add new legends (or updated legends) in folder, we need to 
```
npm build legends
```
This creates a Json with a summary of the essential information for each caption. This json is currently indispensable for listing all available captions. 


## RoadMap - Todo
* Finish & test Fold & Duplex Printing
* Add Guide about markdown
* Add Classic or Eternal Frost mode for caard Letter
* Add InfoBlock in bottom of first/start card
* Add Black & White Format
* Add Difficulty Option for card (Green & Red card versions)


## Development & Project setup
**Disclaimer** :
My first vuejs application, so a bit dirty, a bit haphazard, a bit of a learning curve, and a bit of fun to improve little by little. :)
Be indulgent, and help is always welcome. 

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
