// Table building and rendering utilities

/**
 * Build an HTML table from schema and data
 */
export function buildTable(schema, data) {
  const table = document.createElement('table');
  table.className = 'scraip-table';
  
  // Create header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  
  schema.fields.forEach(field => {
    const th = document.createElement('th');
    th.textContent = field.name;
    th.dataset.field = field.name;
    
    if (field.sortable) {
      th.classList.add('sortable');
      th.addEventListener('click', () => sortTableByColumn(table, field.name));
    }
    
    headerRow.appendChild(th);
  });
  
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  // Create body
  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    schema.fields.forEach(field => {
      const td = document.createElement('td');
      const value = row[field.name] || '';
      
      if (field.type === 'url') {
        const link = document.createElement('a');
        link.href = value;
        link.textContent = value;
        link.target = '_blank';
        td.appendChild(link);
      } else {
        td.textContent = value;
      }
      
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  return table;
}

/**
 * Sort table by column
 */
function sortTableByColumn(table, columnName) {
  // TODO: Implement sorting logic
  console.log('Sorting by:', columnName);
}

/**
 * Group table by column
 */
export function groupTableByColumn(table, columnName) {
  // TODO: Implement grouping logic
  console.log('Grouping by:', columnName);
}
