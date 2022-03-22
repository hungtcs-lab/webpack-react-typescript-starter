import React from "react";
import Hello from '@shared/hello';

export default function App() {
  return (
    <div style={ { overflow: 'hidden' } }>
      <p>App working!</p>
      <Hello name="webpack" />
    </div>
  );
}
