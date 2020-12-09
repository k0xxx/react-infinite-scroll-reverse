# REACT INFINITE SCROLL REVERSE COMPONENT

## How to use

```js
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
```

## In your component

```js
const [isLoading, setIsLoading] = useState(true);
const [itemsList, setItemsList] = useState([]);
const itemsListTotal = 100500;

function getItems(page) {
  setIsLoading(true);
  setTimeout(() => {
    setItemsList(prev => ([...prev, { id: `uniq${page}`, name: "Alex" }]));
    setIsLoading(false);
  }, 300)
}

useEffect(()=>{
  getItems(1);
}, [])

  
<InfinteScrollReverse
  className="itemsContainer"
  hasMore={itemsList.length < itemsListTotal}
  isLoading={isLoading}
  loadMore={getItems}
  loadArea={30}
>
  {itemsList.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</InfinteScrollReverse>
```

## Props

| Name        | Type       | Default                 | isRequired | Description                                               |
| :---------- | :--------- | :---------------------- | :--------- | :-------------------------------------------------------- |
| `className` | `String`   | `InfiniteScrollReverse` | `false`    | Class name of scroll container with overflow              |
| `hasMore`   | `Boolean`  | `false`                 | `true`     | Has more triger                                           |
| `isLoading` | `Boolean`  | `false`                 | `true`     | Data fetching triger, must be `true` when data is loading |
| `loadMore`  | `Function` |                         | `true`     | Load more function                                        |
| `loadArea`  | `Intager`  | `30`                    | `false`    | Scroll area on top. Run loadMore function                 |
