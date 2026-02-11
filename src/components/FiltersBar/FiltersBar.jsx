export default function FiltersBar({
  subcat = "*",
  aroma = "*",
  subcatOrder = [],
  aromas = [],
  onSubcatChange,
  onAromaChange,
}) {
  return (
    <>
      {/* Subcategorías */}
      <div className="d-flex flex-wrap gap-2 mb-3" role="group" aria-label="Filtrar por subcategoría">
        <button
          type="button"
          className={`btn btn-outline-brand btn-sm ${subcat === "*" ? "active" : ""}`}
          data-subcat="*"
          aria-pressed={subcat === "*" ? "true" : "false"}
          onClick={() => onSubcatChange?.("*")}
        >
          Todas
        </button>

        {subcatOrder.map((s) => (
          <button
            key={s}
            type="button"
            className={`btn btn-outline-brand btn-sm ${subcat === s ? "active" : ""}`}
            data-subcat={s}
            aria-pressed={subcat === s ? "true" : "false"}
            onClick={() => onSubcatChange?.(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Aromas (select simple para no explotar con muchos botones) */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <label className="small text-muted" htmlFor="aromaSelect" style={{ marginBottom: 0 }}>
          Aroma:
        </label>

        <select
          id="aromaSelect"
          className="form-select form-select-sm"
          style={{ maxWidth: 320 }}
          value={aroma}
          onChange={(e) => onAromaChange?.(e.target.value)}
          aria-label="Filtrar por aroma"
        >
          <option value="*">Todos</option>
          {aromas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
