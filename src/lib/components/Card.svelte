<script lang="ts">
    export let text: string;
    export let value: number | string;
</script>

<div class="card">
    <h3><div class="accentuate">{value}</div> {text}</h3>
</div>

<style>
    .card{
        background-color: var(--second-background-color);
        border-radius: 15px;
        padding: 10px 40px;
        border: var(--second-border-color) solid 3px;
    }
    h3{
        display: flex;
    }
    .accentuate{
        color: var(--main-color);
        margin-right: 5px; 
        text-decoration-line: underline;
        text-decoration-thickness: 3px;  
    }
</style>