/// <reference types="@sveltejs/kit" />

declare global {
	interface String {
		capitalise(): string;
	}
}
