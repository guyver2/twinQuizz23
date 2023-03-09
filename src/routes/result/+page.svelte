<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { IconCrown, IconPoo } from '@tabler/icons-svelte';
	import { redirect } from '@sveltejs/kit';
	export let data: PageData | undefined;
	export let form: ActionData | undefined;

	const name = form?.name;
	const choices = form?.choices;
	const gt = form?.gt;
	const score = form?.score;

	const scores = data.scores;
	scores.sort((a, b) => {
		return b.score - a.score;
	});
</script>

{#if !form}
	<div class="w-full flex place-content-center items-center p-2 pt-8 lg:pt-36">
		<div class="card w-full lg:w-[800px] flex flex-col content-center">
			<div class="py-6 scoreGrid">
				<p class="font-bold p-4">Score</p>
				<p class="font-bold p-4">Name</p>
				<p class="font-bold p-4">Date</p>

				{#each scores as score, i}
					<p class="p-4">{score.score}</p>
					{#if i == 0}
						<p class="flex gap-1 p-4">{score.name} <IconCrown color={'gold'} /></p>
					{:else if i == 1}
						<p class="flex gap-1 p-4">{score.name} <IconCrown color={'silver'} /></p>
					{:else if i == 2}
						<p class="flex gap-1 p-4">{score.name} <IconCrown color={'#CD7F32'} /></p>
					{:else if i == scores.length - 1}
						<p class="flex gap-1 p-4">{score.name} <IconPoo color={'gold'} /></p>
					{:else if i == scores.length - 2}
						<p class="flex gap-1 p-4">{score.name} <IconPoo color={'silver'} /></p>
					{:else if i == scores.length - 3}
						<p class="flex gap-1 p-4">{score.name} <IconPoo color={'#CD7F32'} /></p>
					{:else}
						<p class="p-4">{score.name}</p>
					{/if}
					<p class="p-4">{score.date}</p>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="w-full flex flex-col place-content-center pt-10">
		{#if score >= 15}
			<div class="flex w-full justify-center items-center gap-2">
				<h1>Score: {score} / 20</h1>
				<IconCrown />
			</div>
		{:else if score <= 5}
			<div class="flex w-full justify-center items-center gap-2">
				<h1>Score: {score} / 20</h1>
				<IconPoo size={36} />
			</div>
		{:else}
			<div class="flex w-full justify-center items-center gap-2">
				<h1>Score: {score} / 20</h1>
			</div>
		{/if}
		<div
			class="flex flex-wrap w-full justify-around items-start p-2 gap-y-4 lg:p-12 lg:gap-4 lg:grid lg:grid-cols-3"
		>
			{#each { length: 20 } as _, i}
				<div
					class="card card-hover variant-ghost-{gt[i] == choices[i]
						? 'primary'
						: 'error'} flex flex-col place-content-center items-center w-full"
				>
					<img class="p-2 w-full aspe lg:p-4 " src="imgs/tq_{i}.jpg" alt="tq_{i}" />
					<div
						class="w-full p-2 pb-4 variant-filled-{gt[i] == choices[i]
							? 'primary'
							: 'error'} text-center rounded-b"
					>
						<div class="flex justify-around w-full font-semibold">
							<div class="w-1/3">{gt[i] ? 'Léo' : 'Antoine'}</div>
							<div class="w-1/3">{gt[i] ? 'Antoine' : 'Léo'}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.scoreGrid {
		display: grid;
		grid-template-columns: 1fr 3fr 3fr;
		gap: 1rem;
		align-items: center;
	}
</style>
