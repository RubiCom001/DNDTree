import { useState } from 'react'
import { ControlledTreeEnvironment , Tree, TreeItemIndex } from 'react-complex-tree';
import { longTree } from "./data";
import { loadTree } from './data2';
import './App.css'

function App() {
  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>();
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);
  const jitems = loadTree(); 
  console.log(JSON.stringify(longTree.items, null, 2));
  console.log(JSON.stringify(jitems, null, 2));
  console.log("expanded: ", expandedItems);
  return (
    <ControlledTreeEnvironment
      items={jitems}
      getItemTitle={item => item.data?.Name}
      viewState={{
        ['tree-2']: {
          focusedItem,
          expandedItems,
          selectedItems,
        },
      }}
      onFocusItem={item => setFocusedItem(item.index)}
      onExpandItem={item => setExpandedItems([...expandedItems, item.index])}
      onCollapseItem={item => setExpandedItems(expandedItems.filter(expandedItemIndex => expandedItemIndex !== item.index))}
      onSelectItems={items => setSelectedItems(items)}
    >
      <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
    </ControlledTreeEnvironment>
  );
}

export default App
