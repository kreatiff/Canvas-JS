const stlAsntHTML = `<!-- modal -->
	<div class="stl-asnt">
		<header class="modal-header">
			<h1 class="modal-header-title left">Stackle Assistant</h1>
			<button class="right modal-close" title="Close Assistant"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="12" width="12"><path d="M14.3,12.18a.24.24,0,0,1,0-.35l9.26-9.27a1.49,1.49,0,0,0,0-2.12,1.51,1.51,0,0,0-2.12,0L12.18,9.7a.25.25,0,0,1-.36,0L2.56.44A1.51,1.51,0,0,0,.44.44a1.49,1.49,0,0,0,0,2.12L9.7,11.83a.24.24,0,0,1,0,.35L.44,21.44a1.49,1.49,0,0,0,0,2.12,1.51,1.51,0,0,0,2.12,0l9.26-9.26a.25.25,0,0,1,.36,0l9.26,9.26a1.51,1.51,0,0,0,2.12,0,1.49,1.49,0,0,0,0-2.12Z" fill="#000000"></path></svg></button>
		</header>
		<div class="modal-body">
			<section class="modal-content">
				<iframe id="stackle-package-finder" src="https://my.stackle.app" style="min-width: 100%; border: 0; overflow: scroll;"></iframe>
			</section>
		</div>
	</div>
	<!-- modal -->`;
const stlAsntLauncher = `<a class="stlAsntLauncher">Stackle</a>`;
const bodyTag = document.body;
const editorToolbar = document.getElementsByClassName('tox-toolbar__primary');
editorToolbar.insertAdjacentHTML( 'beforeend', stlAsntLauncher);
bodyTag.insertAdjacentHTML( 'afterbegin', stlAsntHTML );

