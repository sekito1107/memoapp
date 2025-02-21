export default function MemoItem({ memo, startEditingMemo }) {
  return (
    <li onClick={() => startEditingMemo(memo)}>
      {memo.text.split("\n")[0]}
    </li>
  );
}
