---
repo: sea5kg/pipeline-editor-s5
url: 'https://github.com/sea5kg/pipeline-editor-s5'
homepage: 'https://sea5kg.ru/pipeline-editor-s5/'
starredAt: '2021-07-06T05:23:34Z'
createdAt: '2021-06-22T04:13:31Z'
updatedAt: '2024-09-04T18:21:45Z'
language: JavaScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.630Z'
description: Pipeline Editor (just editor)
tags:
  - diagram-editor
  - editor
  - pipeline
---

# pipeline-editor-s5

[![Total alerts](https://img.shields.io/lgtm/alerts/g/sea-kg/pipeline-editor-s5.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sea-kg/pipeline-editor-s5/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/sea-kg/pipeline-editor-s5.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sea-kg/pipeline-editor-s5/context:javascript) [![npm](https://img.shields.io/npm/v/pipeline-editor-s5)](https://www.npmjs.com/package/pipeline-editor-s5) [![deepcode](https://www.deepcode.ai/api/gh/badge?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybTEiOiJnaCIsIm93bmVyMSI6InNlYS1rZyIsInJlcG8xIjoicGlwZWxpbmUtZWRpdG9yLXM1IiwiYXV0aG9ySWQiOjE1NjQxLCJpYXQiOjE2Mjc3MjIxNjV9.uq45k4n60jyxIaq3CypWoApBocaB_KQRwYbbITr-54s)](https://www.deepcode.ai/app/gh/sea-kg/pipeline-editor-s5/_/dashboard?utm_content=gh%2Fsea-kg%2Fpipeline-editor-s5)

Pipeline Editor s5 (just ui-editor)

[example-editor](https://sea-kg.com/pipeline-editor-s5/)

![Alt text](/contrib/screenshot-01.jpg?raw=true "Screenshot 01")


## Integration

```html
<div style="overflow: scroll; height: 400px; min-height: 400px;">
    <canvas id="pipeline_diagram_canvas"></canvas>
</div>
<script src="./pipeline-editor-s5.js?ver=1"></script>
<script>
    window.render1 = new RenderPipelineEditor('pipeline_diagram_canvas', {
        // HERE configs
    });
    render1.set_data({
        "title": "Some",
        "description": "Some description",
        "nodes": {
            "aCaqNjY": {
                "n": "One",
                "d": "...",
                "i": {},
                "x": 1,
                "y": 0,
                "c": "#ffffff"
            },
            "kB3Cu9b": {
                "n": "Two",
                "d": "...",
                "i": {
                    "aCaqNjY": ""
                },
                "x": 2,
                "y": 2,
                "c": "#ffffff"
            }
        }
    });
</script>
```

## Integration to angular project

```
$ npm install --save pipeline-editor-s5
```

angular.json:
```
...
    "scripts": [
        ...,
        "node_modules/pipeline-editor-s5/html/pipeline-editor-s5.js"
    ]
...
```

add to html-template:
```
...
<div class="pipeline-viewer-container">
    <canvas id="pipeline_viewer"></canvas>
</div>
...
```

add to css:
```
.pipeline-viewer-container {
    display: none;
    overflow: scroll;
    max-height: 10px;
    height: 10px;
    min-height: 10px;
}
```

add to ts file:
```
...
declare var RenderPipelineEditor: any;
...

    show_data() : void {
        this.pipelineEditorInst = new RenderPipelineEditor(
          'pipeline_viewer'
        );
        this.pipelineEditorInst.set_data(this.pipelineData);
    }
```

## Documentation

### Events

* `onselectedblock(blockid)` - when user selected a block
* `onchanged()` - when changed something in scheme

### Enums

PIPELINE_EDITOR_S5_STATE_*:

* `PIPELINE_EDITOR_S5_STATE_MOVING_BLOCKS = 0;`
* `PIPELINE_EDITOR_S5_STATE_REMOVING_BLOCKS = 1;`
* `PIPELINE_EDITOR_S5_STATE_ADDING_BLOCKS = 2;`
* `PIPELINE_EDITOR_S5_STATE_ADDING_CONNECTIONS = 3;`

Line orientation:

* `PIPELINE_EDITOR_S5_LINE_ORIENT_NONE = 0;`
* `PIPELINE_EDITOR_S5_LINE_ORIENT_VERTICAL = 1;`
* `PIPELINE_EDITOR_S5_LINE_ORIENT_HORIZONTAL = 2;`
* `PIPELINE_EDITOR_S5_LINE_ORIENT_POINT = 3;`

Line angel:

* `PIPELINE_EDITOR_S5_LINE_ANGEL_END_LEFT = 0;`
* `PIPELINE_EDITOR_S5_LINE_ANGEL_END_RIGHT = 1;`
* `PIPELINE_EDITOR_S5_LINE_ANGEL_RIGHT_DOWN = 2;`
* `PIPELINE_EDITOR_S5_LINE_ANGEL_LEFT_DOWN = 3;`

### Class RenderPipelineEditor

Constructor, example:

`window.render = new RenderPipelineEditor(element_id_canvas);`

* `constructor(canvas_id, cfg)`
* `get_editor_state()` - will return from enum `PIPELINE_EDITOR_S5_STATE_*`
* `init_font_size()`
* `clone_object(obj)`
* `set_data(data)` - set new data-json, 
* `get_data()` - will return data-json
* `get_data_share()` - get_data and packed with LZString
* `set_data_share(data)` - data-json unpacked with LZString and set_data()
* `change_state_to_removing_blocks()`
* `change_state_to_moving_blocks()`
* `change_state_to_adding_blocks()`
* `change_state_to_adding_connections()`
* `canvas_onmouseover(event)`
* `canvas_onmouseout(event)`
* `canvas_onmouseup(event)`
* `canvas_onmousedown(event)`
* `find_block_id(x0, y0)`
* `canvas_onmousemove(event)`
* `update_meansures()` - Update meansures (like a width of blocks)
* `update_image_size()`
* `calcX_in_px(cell_x)`
* `calcY_in_px(cell_y)`
* `clear_canvas()`
* `draw_menu_scaling_buttons()` - Draw scaling value and buttons for it changing
* `draw_grid()`
* `draw_diagram_name()`
* `draw_blocks()`
* `call_onselectedblock` - private method for call function `onselectedblock` (only if defined by user)
* `correct_line(line)`
* `check_error(line, out_nodeid, in_nodeid)`
* `add_to_draw_connection(x0, x2, y0, y1, y2, out_nodeid, in_nodeid)`
* `auto_placement()`
* `draw_connections()`
* `debug_print_connection_info(obj)`
* `update_pipeline_diagram()`
* `do_connection_blocks()`
* `generate_new_blockid()` - will be generate uniq blockid with fixed possible collisions
* `add_block(_block_info_json)` - add new block by example json `{"n": "edit me", "d": "edit me", "i": {}, "x": t_x, "y": t_y}`
* `prepare_data_cards_one_cells()`
* `prepare_lines_out()`

### Class `RenderPipelineBlock`

* `constructor(nodeid, _conf)`
* `to_json()`
* `copy_from_json(_json)`
* `update_cell_xy(pos_x, pos_y)`
* `get_hash_cell_xy()`
* `get_cell_x()`
* `get_cell_y()`
* `set_color(val)`
* `get_color()`
* `set_name(name)`
* `get_name()`
* `set_description(description)`
* `get_description()`
* `update_block_meansures(_ctx)`
* `nodes_in_same_cells_reset()`
* `nodes_in_same_cells_add(node_id)`
* `get_paralax_in_cell()`
* `outcoming_reset()`
* `outcoming_add(nodeid)`
* `get_paralax_for_line(node_id)`
* `update_incoming_sort(pl_data_render)`
* `draw_block(_ctx, selectedBlockIdEditing)`

### Class `RenderPipelineConfig`

* `constructor()`
* `set_max_cell_xy(x,y)` - set max x and y coordinates block (in cells)
* `set_cell_size(width, height)`
* `get_cell_width()`
* `get_cell_height()`
* `get_diagram_padding_left()` - left padding for diagram
* `get_diagram_padding_top()` - top padding for diagram
* `set_card_size(width, height)`
* `get_card_width()`
* `get_card_height()`
* `get_radius_for_angels()`
* `get_scale_value()` - scaling value (1.0 == 100%)
* `set_scale_value(val)` - set new scale value (1.0 == 100%)
* `get_font_px_suffix()` - return suffix for set font in canvas like `px monospace,monospace`

### Class `RenderPipelineDrawedLinesCache`

* `constructor()`
* `add(line)`
* `has_collision(line)`
* `clear()`

### Class `RenderPipelineConnection`

* `constructor(line1, line2, line3, conf, out_nodeid, in_nodeid)`
* `draw(_ctx)`

### Class `RenderPipelineLine`

* `constructor(x0, y0, x1, y1)`
* `set_x0(val)`
* `set_x1(val)`
* `set_y0(val)`
* `set_y1(val)`
* `has_collision(line)`
* `draw_out_circle(_ctx, radius)`
* `draw_line(_ctx)`
* `draw_arrow(_ctx, radius) `
* `draw_arc(_ctx, radius, angle)`

## Other pipeline editors

Nice diagram and something else:

* https://github.com/elyra-ai/examples/tree/master/pipelines/hello_world_kubeflow_pipelines
* https://github.com/elyra-ai/pipeline-editor



Block-scheme editor:

https://draw.io


Plugin for Jenkins

https://www.jenkins.io/doc/book/blueocean/pipeline-editor/


PlantUML
* https://plantuml.com/ru/starting
* http://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000
