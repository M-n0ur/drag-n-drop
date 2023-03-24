import React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function MyTable() {

  const [rows, setRows] = useState([
    { id: 'row-1', content: 'Row 1' },
    { id: 'row-2', content: 'Row 2' },
    { id: 'row-3', content: 'Row 3' },
  ])

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      // User dropped the item outside of a droppable area
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    // Update the order of the rows
    const reorderedRows = Array.from(rows);
    const [removed] = reorderedRows.splice(startIndex, 1);
    reorderedRows.splice(endIndex, 0, removed);

    // Update the state with the new order of the rows
    setRows(reorderedRows);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
          </tr>
        </thead>
        <Droppable droppableId="rows">
          {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {rows.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{row.id}</td>
                      <td>{row.content}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
}
