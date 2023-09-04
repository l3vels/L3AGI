# L3AGI
<p align="center">
  <a href="https://l3vels.xyz//#gh-light-mode-only">
    <img src="./apps/ui/src/assets/images/l3_logo.png" alt="L3AGI logo" width="150px" height="150px"/>
  </a>
</p>

<p align="center"><i>Open-source framework to make AI agents' team collaboration as effective as human collaboration.</i></p>
    
<h3 align="center">
	<a href="https://dashboard.l3vels.com?utm_medium=community&utm_source=github">Try Our Cloud</a>
   <span> | </span>
	<a href="https://www.l3vels.com?utm_medium=community&utm_source=github">Website</a>
	<span> | </span>
	<a href="./docs/basics.md">Docs</a>
	<span> | </span>
	<a href="https://discord.gg/hQ9ZWabm">Community Discord</a>
</h3>


<p align="center">
<a href="https://github.com/l3vels/L3AGI/fork" target="blank">
<img src="https://img.shields.io/github/forks/l3vels/L3AGI?style=for-the-badge" alt="L3AGI forks"/>
</a>

<a href="https://github.com/l3vels/L3AGI/stargazers" target="blank">
<img src="https://img.shields.io/github/stars/l3vels/L3AGI?style=for-the-badge" alt="L3AGI stars"/>
</a>
<a href='https://github.com/l3vels/L3AGI/releases'>
<img src='https://img.shields.io/github/release/l3vels/L3AGI?&label=Latest&style=for-the-badge'>
</a>

</p>

<p align="center"><b>Follow L3AGI </b></p>

<p align="center">
<a href="https://twitter.com/l3velshq" target="blank">
<img src="https://img.shields.io/twitter/follow/l3vels?label=Follow: l3vels&style=social" alt="Follow L3AGI"/>
</a>
<a href="https://www.reddit.com/r/L3AGI" target="_blank"><img src="https://img.shields.io/twitter/url?label=/r/L3AGI&logo=reddit&style=social&url=https://github.com/l3vels/L3AGI"/></a>

<a href="https://discord.gg/hQ9ZWabm" target="blank">
<img src="https://img.shields.io/discord/1085735429426401340?label=Join%20L3AGI&logo=discord&style=social" alt="Join L3AGI Discord Community"/>
</a>
<a href="https://www.youtube.com/@gigachkhikvadze7497" target="_blank"><img src="https://img.shields.io/twitter/url?label=Youtube&logo=youtube&style=social&url=https://github.com/l3vels/L3AGI"/></a>
</p>

<p align="center"><b>Connect with the Creators </b></p>

<p align="center">
<a href="https://twitter.com/gigch_eth" target="blank">
<img src="https://img.shields.io/twitter/follow/gigch_eth?label=Follow: gigch_eth&style=social" alt="Follow Chkhikvadze"/>
</a>
<a href="https://twitter.com/EduardoFaraday" target="blank">
<img src="https://img.shields.io/twitter/follow/EduardoFaraday?label=Follow: EduardoFaraday&style=social" alt="Follow EduardoFaraday"/>
</a>
<a href="https://twitter.com/MOkradze" target="blank">
<img src="https://img.shields.io/twitter/follow/MOkradze?label=Follow: MOkradze&style=social" alt="Follow Okradze"/>
</a>
</p>


<!-- <p align="center"><b>Share L3AGI Repository</b></p> -->



<!-- <p align="center">

<a href="https://twitter.com/intent/tweet?text=Open-source%20framework%20to%20make%20AI%20agents'%20team%20collaboration%20as%20effective%20as%20human%20collaboration.%0A%0Ahttps%3A//github.com/l3vels/L3AGI%0A%23l3vels%20%23l3ai%20%23l3agi%20" target="blank">
<img src="https://img.shields.io/twitter/follow/l3velsh1?label=Twitter&style=social" alt="Follow l3vels"/></a> 
<a href="https://www.reddit.com/submit?url=https://github.com/l3vels/L3AGI&title=Check%20this%20GitHub%20repository%20out.%20L3AGI%20-%20Let's%20you%20easily%20build,%20manage%20and%20run%20useful%20autonomous%20AI%20agents.
" target="blank">
<img src="https://img.shields.io/twitter/url?label=Reddit&logo=Reddit&style=social&url=https://github.com/l3vels/L3AGI" alt="Share on Reddit"/>
</a> 
<a href="mailto:?subject=Check%20this%20GitHub%20repository%20out.&body=L3AGI%20-%20Let%27s%20you%20easily%20build,%20manage%20and%20run%20useful%20autonomous%20AI%20agents.%3A%0Ahttps://github.com/l3vels/L3AGI" target="_blank"><img src="https://img.shields.io/twitter/url?label=Gmail&logo=Gmail&style=social&url=https://github.com/l3vels/L3AGI"/></a> 


<hr> -->



## Directory Structure

```
.
├── apps/
│ ├── ui/ # React UI Application
│ └── server/ # Python FastAPI Server
└── docker-compose.yml # Main Docker Compose File
```

## Pre-requisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/l3vels/L3AGI.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd L3AGI
   ```

3. ** Setup Git Hooks **

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   This will build and start both the React UI and FastAPI services.

4. **Run Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   This will build and start both the React UI and FastAPI services.

## Access the Services

- **React UI**: Open `http://localhost:3000` in your browser.
- **FastAPI Server**: Open `http://localhost:4002` in your browser or API client.

## Troubleshooting

- If you encounter issues when starting the services, ensure Docker and Docker Compose are installed and up to date.
- Check the logs for any service-specific errors.
