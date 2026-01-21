
export default function figmaAssetsPlugin() {
  return {
    name: 'vite-plugin-figma-assets',
    resolveId(id) {

      if (id.startsWith('figma:asset/')) {

        return '\0' + id;
      }
    },
    load(id) {

      if (id.startsWith('\0figma:asset/')) {

        const assetId = id.slice(1);
        

        const hash = assetId.replace('figma:asset/', '').replace('.png', '');
        

        const localPath = `/src/assets/${hash}.png`;   
        return `export default "${localPath}";`;
        

      }
    }
  };
}
