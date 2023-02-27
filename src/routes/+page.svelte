<script lang="ts">
	import { IconArrowsLeftRight } from '@tabler/icons-svelte';

	let name = null as string | null;

	let stage = 1;
	let img_cnt = 0;
	let choice = 0;
	let choices = [] as number[];
	let leftName = 'Antoine';
	let rightName = 'Léo';

	function next() {
		choices.push(choice);
		if (img_cnt < 19) {
			choice = 0;
			leftName = 'Antoine';
			rightName = 'Léo';
			img_cnt++;
		}
	}

	function swap() {
		choice = choice ? 0 : 1;
		if (choice) {
			rightName = 'Antoine';
			leftName = 'Léo';
		} else {
			leftName = 'Antoine';
			rightName = 'Léo';
		}
	}

	function start() {
		if (name) {
			stage = 2;
		}
	}
</script>

{#if stage == 1}
	<div class="w-full flex place-content-center items-center pt-36">
		<div class="card w-96 flex flex-col content-center">
			<!-- Card Body -->
			<div class="py-16 gap-4 flex flex-col place-content-center items-center">
				<label class="label flex flex-col">
					<span>Your Name</span>
					<input class="input text p-1" type="text" placeholder="Name" bind:value={name} />
				</label>
				<button class="btn bg-primary-500" on:click={start}> GO ! </button>
			</div>
		</div>
	</div>
{:else}
	<div class="lg:h-screen">
		<div class="w-full flex place-content-center items-center p-1 lg:p-4 pt-12 lg:h-5/6">
			<div class="card flex flex-col place-content-center items-center lg:max-h-full lg:w-5/6">
				<img
					class="p-2 lg:m-4 lg:p4 lg:h-1/2 object-contain"
					src="/imgs/tq_{img_cnt}.jpg"
					alt="tq_{img_cnt}"
				/>
				<div class="w-5/6 flex content-between justify-around p-4">
					<p class="badge variant-ghost-{choice ? 'error' : 'success'} text-center lg:w-1/5">
						{leftName}
					</p>
					<button class="btn bg-tertiary-700" on:click={swap}><IconArrowsLeftRight /></button>
					<p class="badge variant-ghost-{choice ? 'success' : 'error'} text-center lg:w-1/5 ">
						{rightName}
					</p>
				</div>
				{#if img_cnt == 19}
					<form method="POST" action="/result">
						<input type="hidden" name="name" bind:value={name} />
						<input type="hidden" name="choices" value={JSON.stringify(choices)} />
						<input type="hidden" name="lastChoice" bind:value={choice} />
						<button class="btn bg-warning-500 m-4" on:click={next}> Next {img_cnt + 1} / 20</button>
					</form>
				{:else}
					<button class="btn bg-primary-500 m-4" on:click={next}> Next {img_cnt + 1} / 20</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
