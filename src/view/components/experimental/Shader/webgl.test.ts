import { describe, expect, test } from "vitest";

import { normalizeShaderGraph, resolveBufferPassOrder } from "./webgl";

const shader = {
	rawGLSL: `void mainImage(out vec4 fragColor, vec2 fragCoord) {
		fragColor = vec4(1.0);
	}`
} as const;

describe("Shader graph normalization", () => {
	test("normalizes legacy source into an image-only graph", () => {
		const graph = normalizeShaderGraph({
			source: shader
		});

		expect(graph.image.id).toBe("image");
		expect(graph.image.shader).toEqual(shader);
		expect(graph.image.channels.length).toBe(4);
		expect(graph.buffers).toEqual([]);
	});

	test("prefers graph when source and graph are both provided", () => {
		const graph = normalizeShaderGraph({
			source: shader,
			graph: {
				image: {
					shader: {
						rawGLSL: `void mainImage(out vec4 fragColor, vec2 fragCoord) {
							fragColor = vec4(0.0);
						}`
					}
				}
			}
		});

		expect(graph.image.shader).toEqual({
			rawGLSL: `void mainImage(out vec4 fragColor, vec2 fragCoord) {
							fragColor = vec4(0.0);
						}`
		});
	});

	test("throws when a pass references an unknown pass input", () => {
		expect(() =>
			normalizeShaderGraph({
				graph: {
					buffers: [
						{
							id: "bufferA",
							shader,
							channels: [{ type: "pass", passId: "missing" }]
						}
					],
					image: { shader }
				}
			})
		).toThrow('references unknown pass "missing"');
	});

	test("throws when more than 4 channels are supplied", () => {
		expect(() =>
			normalizeShaderGraph({
				graph: {
					image: {
						shader,
						channels: [
							{ type: "texture", url: "a" },
							{ type: "texture", url: "b" },
							{ type: "texture", url: "c" },
							{ type: "texture", url: "d" },
							{ type: "texture", url: "e" }
						]
					}
				}
			})
		).toThrow("can only have 4 channels");
	});
});

describe("Shader buffer pass ordering", () => {
	test("resolves ordered dependencies", () => {
		const graph = normalizeShaderGraph({
			graph: {
				buffers: [
					{ id: "bufferA", shader },
					{
						id: "bufferB",
						shader,
						channels: [{ type: "pass", passId: "bufferA" }]
					},
					{
						id: "bufferC",
						shader,
						channels: [{ type: "pass", passId: "bufferB" }]
					}
				],
				image: {
					shader,
					channels: [{ type: "pass", passId: "bufferC" }]
				}
			}
		});

		expect(resolveBufferPassOrder(graph)).toEqual(["bufferA", "bufferB", "bufferC"]);
	});

	test("allows self-feedback references", () => {
		const graph = normalizeShaderGraph({
			graph: {
				buffers: [
					{
						id: "bufferA",
						shader,
						channels: [{ type: "pass", passId: "bufferA" }]
					}
				],
				image: {
					shader,
					channels: [{ type: "pass", passId: "bufferA" }]
				}
			}
		});

		expect(resolveBufferPassOrder(graph)).toEqual(["bufferA"]);
	});

	test("rejects cyclic cross-pass dependencies", () => {
		expect(() =>
			normalizeShaderGraph({
				graph: {
					buffers: [
						{
							id: "bufferA",
							shader,
							channels: [{ type: "pass", passId: "bufferB" }]
						},
						{
							id: "bufferB",
							shader,
							channels: [{ type: "pass", passId: "bufferA" }]
						}
					],
					image: { shader }
				}
			})
		).toThrow("cyclic pass dependencies");
	});
});
