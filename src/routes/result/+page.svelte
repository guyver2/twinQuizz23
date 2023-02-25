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
	<div class="w-full flex place-content-center items-center pt-36">
		<div class="card w-96 flex flex-col content-center">
			<div class="py-16 gap-4 flex flex-col place-content-center items-center">
				{#each scores as score}
					<p>{score.name} : {score.score}</p>
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
		{/if}
		<div
			class="flex flex-wrap w-full justify-around items-start p-2 gap-y-4 lg:p-12 lg:gap-4 lg:grid lg:grid-cols-3"
		>
			{#each { length: 20 } as _, i}
				<div
					class="card variant-ghost-{gt[i] == choices[i]
						? 'primary'
						: 'error'} flex flex-col place-content-center items-center w-full"
				>
					<img class="p-2 w-full aspe lg:p-4 " src="imgs/tq_{i}.jpg" alt="tq_{i}" />
					<div
						class="w-full p-2 pb-4 variant-filled-{gt[i] == choices[i]
							? 'primary'
							: 'error'} text-center rounded-b"
					>
						{gt[i] ? 'Right' : 'Left'}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
