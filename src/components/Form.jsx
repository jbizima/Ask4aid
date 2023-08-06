export default function Form({ text, handleChange}) {
  return (
    <form className="w-full relative max-w-xl mx-auto" onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        name="text"
        value={text}
        onChange={handleChange}
        placeholder="Search a country"
        className="block w-full indent-6 pb-0.5 h-16 rounded-[30px] shadow-small"
      />
    </form>
  );
}
