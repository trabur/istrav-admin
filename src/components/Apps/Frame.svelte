<script>
  export let domain
  export let state
</script>

<div id="wrap">
  <iframe id="frame" title={state} src={`https://${domain}`} width="400" height="200"></iframe>
</div>

<style>
  #wrap {
    background: #fff;
    float: left;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    width: 320px;
    height: 192px;
    padding: 0;
    overflow: hidden;
  }
  #frame {
    width: 1280px;
    height: 786px;
    border: 0;

    -ms-transform: scale(0.25);
    -moz-transform: scale(0.25);
    -o-transform: scale(0.25);
    -webkit-transform: scale(0.25);
    transform: scale(0.25);

    -ms-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
</style>