
<script>
  export let url
</script>

<div class="browser">
  <div class="browser-row">
    <div class="browser-column left">
      <span class="dot" style="background:#ED594A;"></span>
      <span class="dot" style="background:#FDD800;"></span>
      <span class="dot" style="background:#5AC05A;"></span>
    </div>
    <div class="browser-column middle">
      <input type="text" value={url || "https://istrav.com"}>
    </div>
    <div class="browser-column right">
      <div style="float:right">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </div>

  <div class="content">
    <slot></slot>
  </div>
</div>


<style>
  * {
    box-sizing: border-box;
  }
  
  /* The browser window */
  .browser {
    border: 3px solid #888;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    box-shadow: 0 0 20px grey;
  }
  
  /* Container for columns and the top "toolbar" */
  .browser-row {
    padding: 10px;
    background: #888;
  }
  
  /* Create three unequal columns that floats next to each other */
  .browser-column {
    float: left;
  }
  
  .left {
    width: 15%;
  }
  
  .right {
    width: 10%;
  }
  
  .middle {
    width: 75%;
  }
  
  /* Clear floats after the columns */
  .browser-row:after {
    content: "";
    display: table;
    clear: both;
  }
  
  /* Three dots */
  .dot {
    margin-top: 0.5em;
    height: 12px;
    width: 12px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
  
  /* Style the input field */
  input[type=text] {
    width: 100%;
    border-radius: 3px;
    border: none;
    background-color: #fff;
    margin: -0.1em 0 0;
    height: 25px;
    color: #666;
    padding: 5px;
  }
  
  /* Three bars (hamburger menu) */
  .bar {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 5px 0;
    display: block;
  }
  
  /* Page content */
  .content {
    padding: 10px;
    background: #eee;
  }
</style>