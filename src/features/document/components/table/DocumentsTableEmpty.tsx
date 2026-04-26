export function DocumentsTableEmpty() {
  return (
    <tbody>
      <tr>
        <td
          colSpan={5}
          className="px-4 py-10 text-center text-sm text-muted-foreground"
        >
          No documents found.
        </td>
      </tr>
    </tbody>
  );
}
