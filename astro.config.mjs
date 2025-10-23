import tailwindcss from "@tailwindcss/vite";
// @ts-check

import fs from "fs";
import path from "path";
import mdx from '@astrojs/mdx';
import { fileURLToPath, URL } from "url";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

/**
 * Function to remove dev-only files like `/public/admin` from the final build
 */
function RemoveDevAssetsIntegration() {
  return {
    name: "remove-dev-assets",
    hooks: {
      "astro:build:done": (/** @type {{ dir: URL }} */{ dir }) => {
        const outDir = fileURLToPath(dir);

        if (process.env.NODE_ENV !== "development") {
          const devOnlyFiles = [path.join(outDir, "admin")];
          for (const target of devOnlyFiles) {
            if (fs.existsSync(target)) {
              fs.rmSync(target, { recursive: true, force: true });
              console.log(`Removed dev-only asset: ${target}`)
            }
          }
        }
      },
    },
  };
}

// Configuration SEE: https://astro.build/config
export default defineConfig({
	site: 'https://example.com', // TODO: update with domain when we have one
	integrations: [mdx(), sitemap(), RemoveDevAssetsIntegration()],
	redirects: {
		// Keep forgetting to add /index.html, so adding a redirect here
		"/admin": "/admin/index.html",
	},
  
	vite: {
		plugins: [tailwindcss()],
	},
});


