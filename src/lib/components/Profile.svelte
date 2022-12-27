<script lang="ts">
    export let  bioDescription: string,
                birthDate: string,
                emailAddress: string,
                telephoneNumber: string,
                userName: string;
    export let profilePhoto: string, profileVideo: string;    
    export let interests: string[];
</script>

<div class="profile">
    <div class="image">
        {#if profilePhoto !== "None"}
            <img src={profilePhoto} class="box" alt="">
        {:else if profileVideo !== "None" }
            <video src={profileVideo} class="box"><track kind="captions"></video>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5" shape-rendering="crispEdges"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title>Identicon</dc:title><dc:creator><cc:Agent><dc:title>Florian Körner</dc:title></cc:Agent></dc:creator><dc:source>https://github.com/dicebear/dicebear</dc:source><cc:license rdf:resource="https://creativecommons.org/publicdomain/zero/1.0/"/></cc:Work><cc:License rdf:about="https://creativecommons.org/publicdomain/zero/1.0/"><cc:permits rdf:resource="https://creativecommons.org/ns#Reproduction"/><cc:permits rdf:resource="https://creativecommons.org/ns#Distribution"/><cc:permits rdf:resource="https://creativecommons.org/ns#DerivativeWorks"/></cc:License></rdf:RDF></metadata><mask id="avatarsRadiusMask"><rect width="5" height="5" rx="0" ry="0" x="0" y="0" fill="#fff"/></mask><g mask="url(#avatarsRadiusMask)"><path d="M2 4h1v1H2V4z" fill="#00ACC1"/><path d="M0 3h1v1H0V3zm2 0h1v1H2V3zm2 0h1v1H4V3z" fill-rule="evenodd" fill="#00ACC1"/><path d="M1 2h3v1H1V2z" fill="#00ACC1"/><path d="M0 1h1v1H0V1zm4 0h1v1H4V1z" fill-rule="evenodd" fill="#00ACC1"/><path d="M1 0h3v1H1V0z" fill="#00ACC1"/></g></svg>    
        {/if}
        <h3>@{userName}</h3>
    </div>
    <div class="right">
        <h4>Account info</h4>
        <p>{birthDate}</p>
        {#if emailAddress !== "None"}
            <p>{emailAddress !== "None" ? emailAddress : "No mail found" }</p>
        {/if}
        {#if telephoneNumber !== "None"}
            <p>{telephoneNumber !== "None" ? telephoneNumber : "No phone found" }</p>
        {/if}
        {#if bioDescription !== ""}
            <p>{bioDescription === "" ? "Empty bio" : bioDescription}</p>    
        {/if}
        <div class="topics">
            <h4>Topics</h4>
            <div class="list">
                {#each interests as interest}
                    <p>{interest}</p>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .profile{
        display: flex;
        background-color: var(--second-background-color);
        padding: 10px 20px;
        border-radius: 15px;
        align-items: center;
        border: var(--second-border-color) solid 3px;
    }

    .box{
        width: 150px;
        height: 150px;
        border-radius: 15px;
    }

    .image{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    svg{
        background-color: white;
    }

    .right{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-left: 30px;
    }

    .list{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .list p{
        margin-right: 15px;
    }
    p{
        color: var(--second-text-color);
    }
</style>