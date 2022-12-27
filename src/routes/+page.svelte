<script lang="ts">
    import "./Style.css"
	import { analyseJSON } from "$lib/processing";
	import type { CardInfo, ProfileData } from "src/lib/typing";
    
	import Line from "svelte-chartjs/Line.svelte";
    import 'chart.js/auto';

	import Profile from "../lib/components/Profile.svelte";
	import Card from "$lib/components/Card.svelte";


    let profileData: ProfileData;
    let cards: CardInfo[];
    let end: object;
    let loginGraph: object;

    let filesUpload: FileList;
    let file: File;
    let fileName: string;

    let invalidFileType: boolean = false;
    let invalidFileName: string;

    // Verify that there is a file
    $: if(filesUpload && filesUpload[0] && fileName !== filesUpload[0].name){
        invalidFileType = false;

        file = filesUpload[0];
        if(file.name.split(".")[-1] === "json" || file.type === "application/json"){
            invalidFileType = false;
            fileName = file.name;

            let fileReader: FileReader = new FileReader();
            fileReader.onload = async () => {
                let result: string = fileReader.result as string;
                let json: object = JSON.parse(result);

                let analysed = analyseJSON(json);
                profileData = analysed.profileData as ProfileData;
                end = analysed.graph;
                cards = analysed.cards;
                loginGraph = analysed.loginGraph;
            };
            
            fileReader.readAsText(file, "utf8")
        }else{
            invalidFileType = true;
            invalidFileName = file.name;
        }
    }
</script>

<div class="top">
    <h1>Tiktok data analyser</h1>
    <p>Visit <a href="https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data" class="howto" target="_blank" rel="noreferrer">here</a> to find your data</p>
    {#if invalidFileType}
        <p style="color: red;"><strong>{invalidFileName}</strong> is not the right file, i need .json file (located in the .zip file)</p>
    {/if}
    
    <input type="file" bind:files={filesUpload} >    
</div>
{#if profileData}

<div class="information">
    <Profile {...profileData} />
    
    <div class="cards">
        {#each cards as card}
            <Card {...card} />
        {/each}
    </div>

    <div class="wrapper">
        <Line data={end} />
    </div>
    <div class="wrapper">
        <Line data={loginGraph} />
    </div>

</div>
    
{/if}
<style>
    .top{
        margin-top: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    p{
        margin-bottom: 10px;
    }
    .howto{
        color: var(--main-color);
        
    }

    .information{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        margin-top: 50px;
    }

    .cards{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        width: 50%;
    }

    @media screen and (max-Width: 1300px){
        .cards{
            width: 80%;
        }
    }

    @media screen and (max-Width: 1000px){
        .cards{
            width: 100%;
        }
    }
    .wrapper{
        width: 900px;
        max-width: 100%;
        background-color: var(--second-background-color);
        padding: 15px;
        border-radius: 15px;
        border: var(--second-border-color) solid 3px;
    }
</style>