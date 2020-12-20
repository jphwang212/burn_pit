![fire](https://raw.githubusercontent.com/airboyd/burn_pit/main/fireball.png)

# Pyrograph

Vets Hackathon December 18-20 in the year of our dark lord, 2020


### The Problem

> [**“I'm not a doctor, I'm not a scientist. But, I'm also not an idiot. If you live next to a toxic smoke plume filled with cancer-causing elements, and you're breathing it in day in and day out, it's going to make you sick," Stewart said, regarding what many veterans have faced since returning from war.”**](https://www.npr.org/2020/09/16/913376758/jon-stewart-uses-his-celebrity-to-bring-attention-to-vets-exposed-to-burn-pits)<br>
> — Jon Stewart

### Use Case 1

Joe is a veteran who separated from the military 6 years ago and is looking for more information about burn pit exposure, having visited multiple deployed locations.

He started to fill out the VA Burn Pit Registry but ran into roadblocks due to the number of form fields required and with a lack of defined dates, times and locations to enter. Joe also wanted to be in control of his own data in order to advocate for himself and realized data sharing from the VA was mostly unidirectional.

### Use Case 2

Mary is a journalist who is writing a feature article about burn pits and the risk to veterans. 

She understands the premise of burn pits based on summary research but wants to do a deeper dive and explore / verify new links and relationships that will help her write a story that gets picked up and distributed.


Features
--------

- MVC Project structure
- Mapbox visualization
- Vue.JS front end
- Data ingestion capabilities
- Custom SVG graphics


Prerequisites to Run On Your Local Machine
-------------

- Node
- NPM


The Data Model
---------------
![data-model](https://raw.githubusercontent.com/airboyd/burn_pit/main/burn-pit-data-model.png)



Getting Started with the API
---------------
1. Download Postman [Postman API Client](https://www.postman.com/product/rest-client/)

2. View GraphQL API Documentation https://documenter.getpostman.com/view/2502975/TVssk8rA

3. Run collection in Postman using link above to launch desktop application once installed.

4. Run individual API calls to Create, Read, Update and Destroy the data you need into / out of the Pyrograph.



So you wanna clone this repo?
---------------

```bash
# Get the latest snapshot
git clone https://github.com/airboyd/burn_pit.git YuhrProjectNameGoesHere

# Change directory
cd YuhrProjectNameGoesHere

```

Contribution areas to consider
---------------
1. Adding data to the graph in order to better serve use cases 1 and 2
2. Enhancing Map-centric UI to make it easier to navigate and explore
3. Creating bug requests or feature requests using the issue tracker
4. Publicizing the project by referencing back if you found it useful

Contribution guidelines
------------

If something is unclear, confusing, or needs to be refactored, please let us know. 
Pull requests are always welcome. 
Please open an issue before submitting a pull request.

License
-------

The MIT License (MIT)

Copyright (c) 2020

Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:

The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
