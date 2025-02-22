export default function MemoForm({
  editingMemo,
  handleTextChange,
  handleUpdateMemo,
  handleDeleteMemo,
  editingTextRef,
}) {
  return (
    <div>
      <textarea
        defaultValue={editingMemo.text}
        ref={(element) => element && (element.value = editingTextRef.current)}
        onChange={handleTextChange}
      />
      <button onClick={handleUpdateMemo}>更新</button>
      <button onClick={handleDeleteMemo}>削除</button>
    </div>
  );
}
