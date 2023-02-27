<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="flex place-content-between h-20">
			<div class="flex place-content-start items-baseline">
				<h1
					class="p-4 cursor-pointer text-center w-full lg:text-left"
					on:click={() => {
						goto('/');
					}}
					on:keypress={() => {
						goto('/');
					}}
				>
					Twin quizz 2.0
				</h1>
				<h3
					class="px-6 underline cursor-pointer"
					on:click={() => {
						goto('/result');
					}}
					on:keypress={() => {
						goto('/result');
					}}
				>
					Results
				</h3>
			</div>
			<div class="p-4">
				<LightSwitch width={'w-12'} height={'h-6'} />
			</div>
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>
