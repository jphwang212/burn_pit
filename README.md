![fire](https://raw.githubusercontent.com/airboyd/burn_pit/main/fireball.png)

# Pyrograph
# Smoke-Pit
# Trogdor (Burninating the Countryside)

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


Several research projects done by Mary suggested that Flamingos thrive better when there are abundant water bodies for their habitat.

Her team got approval for expanding the water source for the Flamingos in the San Francisco Zoo, and her team is ready for a trip to San Francisco with Mary remotely monitoring the progress of the team.

Her teammates wish to stay close to the Golden Gate Bridge so that they could cycle around the Golden gate, enjoy the breeze, and the sunrise every morning.

Let’s help them find a hotel which is within a reasonable distance from the Golden Gate Bridge, and we’ll do so using Dgraph’s geolocation functions.



Features
--------

- **Local Authentication** using Email and Password
- **OAuth 2.0 Authentication** via GitHub
- MVC Project Structure
- Sass stylesheets (auto-compiled via middleware)
- Vue.JS
- Contact Form (powered by Mailgun, Sendgrid or Mandrill)
- **Account Management**
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Delete Account


Prerequisites (Fill in with actuals)
-------------

- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js 10+](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) OR [Visual Studio Code](https://code.visualstudio.com) + [Windows Subsystem for Linux - Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

**Note:** Special thing to keep in mind lest you screw up.


Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/sahat/hackathon-starter.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

###The Data Model

Example Neo4J Cypher language Query to create basic nodes and edges
```
CREATE
  (`0` :`Burn Pit` {Name:"Camp Fallujah",lat:'33.355026',lng:'43.783337'}) ,
  (`1` :ServiceMember {Name:"Billy Badass",JoinDate:'2018-12-19',ReleaseDate:'209-12-19'}) ,
  (`2` :Material {Name:'Batteries',ImgURI:'https://ds8ah.com'}) ,
  (`4` :`Burn Pit` {Name:"Camp Baharia",Lat:'33.315264',Long:'43.883169'}) ,
  (`1`)-[:`Visited` ]->(`0`),
  (`2`)-[:``Burned at`` ]->(`0`),
  (`1`)-[:`Visited` ]->(`4`)

```

Contributing
------------

If something is unclear, confusing, or needs to be refactored, please let us know. Pull requests are always welcome. Please open an issue before submitting a pull request.

License
-------

The MIT License (MIT)

Copyright (c) 2020

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
