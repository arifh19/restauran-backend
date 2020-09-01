# Restaurant Backend

Create funny meme using javascript. It just simple library, just include in your html file using `<script src>` and start creating your meme. So it doesn't require any fuckin tools like npm or any else.

## Install
```
npm install
```

## Run
```
npm start
```


## APIs
|Method|Endpoint||Description|
|---|--|--|
|GET `string`|/category `string`|`string`| List of category
|POST `string`|/category `string` `object`| Create new category
|PUT `string`|/category `string`| Update a category 
|DELETE `string`|/category `string`| Delete a category

## Example
```
let meme = new MemeJS({
    width: 600,
    height: 600
})
meme.setTemplate("./assets/bg.jpg")
meme.addImage({
    src: './assets/js.jpg',
    width: 130,
    height: 130,
    position: {
        x: 200,
        y: 305
    }
})
meme.addText({
    text: '*temen: lu kalo bikin meme gimana?',
    position: {
        x: 25, 
        y: 55
    }
})
meme.addText({
    text: 'gw :',
    position: {
        x: 25, 
        y: 105
    }
})
meme.download("meme")
```

## Contribute
Anyone can make meme. Also anyone can contribute into this weird project. Just make pull request to contribute. 
