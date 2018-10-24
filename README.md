# REACT INFINITE SCROLL REVERSE COMPONENT

## How to use

```js
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
```

## In your component

```js
<InfinteScrollReverse
  className="itemsContainer"
  hasMore={itemsList.length < itemsListTotal}
  isLoading={true || false}
  loadMore={this.getItems}
  loadArea={10}
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
| `loadArea`  | `Intager`  | `10`                    | `false`    | Scroll area on top. Run loadMore function                 |
