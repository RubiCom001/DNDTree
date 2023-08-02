/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeItem } from 'react-complex-tree';

interface TreeData {
  Name: string;
  selected: boolean;
}

function generateUUID(): string {
  // Generate a UUID here. You can use 'uuid' npm package
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export function createTreeItem(items: Record<string, TreeItem<TreeData>>, name = "New Item(rename me)", isFolder = false, idp?:string): string {
  const id = idp??generateUUID();
  const newItem: TreeItem<TreeData> = {
    index: id,
    canMove: true,
    isFolder,
    children: [],
    data: { Name: name, selected: false },
    canRename: true,
  };

  items[id] = newItem;
  return id;
}

export function renameTreeItem(id: string, newName: string, items: Record<string, TreeItem<TreeData>>) {
  if (!items[id]) throw new Error("Item does not exist.");
  items[id].data.Name = newName;
}

export function loadTree(): any {
  const items: any = {};
  const rootId = createTreeItem(items, 'root', true, 'root');
  // Create 10 parents
  for (let i = 1; i <= 3; i++) {
    const parentId = createTreeItem(items, `Parent ${i}`, true);
    items[rootId].children?.push(parentId);
    // Create 5 children for each parent
    for (let j = 1; j <= 1; j++) {
      const childId = createTreeItem(items, `Child ${j} of Parent ${i}`, false);
      items[parentId].children?.push(childId);

      // For the first 2 children, create 3 more children
      if (j <= 2) {
        for (let k = 1; k <= 2; k++) {
          const subChildId = createTreeItem(items, `Child ${k} of Child ${j} of Parent ${i}`, false);
          items[childId].children?.push(subChildId);
        }
      }
    }
  }
  
  return items;
}
/*const jitems = {
    "root": {
        "index": "root",
        "canMove": true,
        "isFolder": true,
        "children": [
            "baf9",
            "4b19",
            "efe3"
        ],
        "data": {
            "Name": "root",
            "selected": false
        },
        "canRename": true
    },
    "baf9": {
        "index": "baf9",
        "canMove": true,
        "isFolder": true,
        "children": [
            "57d4"
        ],
        "data": {
            "Name": "Parent 1",
            "selected": false
        },
        "canRename": true
    },
    "57d4": {
        "index": "57d4",
        "canMove": true,
        "isFolder": false,
        "children": [
            "61d8",
            "0fd2"
        ],
        "data": {
            "Name": "Child 1 of Parent 1",
            "selected": false
        },
        "canRename": true
    },
    "61d8": {
        "index": "61d8",
        "canMove": true,
        "isFolder": false,
        "children": [],
        "data": {
            "Name": "Child 1 of Child 1 of Parent 1",
            "selected": false
        },
        "canRename": true
    },
    "0fd2": {
        "index": "0fd2",
        "canMove": true,
        "isFolder": false,
        "children": [],
        "data": {
            "Name": "Child 2 of Child 1 of Parent 1",
            "selected": false
        },
        "canRename": true
    },
    "4b19": {
        "index": "4b19",
        "canMove": true,
        "isFolder": true,
        "children": [
            "32bc"
        ],
        "data": {
            "Name": "Parent 2",
            "selected": false
        },
        "canRename": true
    },
    "32bc": {
        "index": "32bc",
        "canMove": true,
        "isFolder": false,
        "children": [
            "d74c",
            "fa33"
        ],
        "data": {
            "Name": "Child 1 of Parent 2",
            "selected": false
        },
        "canRename": true
    },
    "d74c": {
        "index": "d74c",
        "canMove": true,
        "isFolder": false,
        "children": [],
        "data": {
            "Name": "Child 1 of Child 1 of Parent 2",
            "selected": false
        },
        "canRename": true
    },
    "fa33": {
        "index": "fa33",
        "canMove": true,
        "isFolder": false,
        "children": [],
        "data": {
            "Name": "Child 2 of Child 1 of Parent 2",
            "selected": false
        },
        "canRename": true
    },
    "efe3": {
        "index": "efe3",
        "canMove": true,
        "isFolder": true,
        "children": [
            "69c8"
        ],
        "data": {
            "Name": "Parent 3",
            "selected": false
        },
        "canRename": true
    },
    "69c8": {
        "index": "69c8",
        "canMove": true,
        "isFolder": false,
        "children": [
            "d48b",
            "41fe"
        ],
        "data": {
            "Name": "Child 1 of Parent 3",
            "selected": false
        },
        "canRename": true
    },
    "d48b": {
        "index": "d48b",
        "canMove": true,
        "isFolder": false,
        "children": [],
        "data": {
            "Name": "Child 1 of Child 1 of Parent 3",
            "selected": false
        },
        "canRename": true
    },
    "41fe": {
        "index": "41fe",
        "canMove": true,
        "isFolder": false,
        "children": [],
        "data": {
            "Name": "Child 2 of Child 1 of Parent 3",
            "selected": false
        },
        "canRename": true
    }
}*/
/*export function saveTree(items: Record<string, TreeItem<TreeData>>) {
  // Convert the items object to a JSON string and save it to the database here.
  // Placeholder for actual implementation
}*/
