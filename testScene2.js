var createScene = function() {
	// Create a scene.
	var scene = new BABYLON.Scene(engine);

	// Create a default skybox with an environment.
	// var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
	// var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

	// Append glTF model to scene.
	var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,0,-10),scene);
	// BABYLON.SceneLoader.Append("L&T_Valve_v2/", "L&T_Valve.gltf", scene, function (scene) {
	// 	// Create a default arc rotate camera and light.
	// 	scene.createDefaultCameraOrLight(true, true, true);

	// 	// The default camera looks at the back of the asset.
	// 	// Rotate the camera by 180 degrees to the front of the asset.
	// 	scene.activeCamera.alpha += Math.PI;
	// });
	BABYLON.SceneLoader.ImportMesh("", "L&T_Valve_v2/", "L&T_Valve.gltf", scene, function (newMeshes) {
		// var buggy2 = newMeshes[0];
		scene.createDefaultCameraOrLight(true, true, true);
		camera = scene.activeCamera;
		// camera.alpha += Math.PI/2;
		// console.log(scene.activeCamera);
		// camera.focusOn([newMeshes[0]], true);
		camera.target = newMeshes[0].getBoundingInfo().boundingBox.centerWorld;
		// console.log(camera.wheelDeltaPercentage);
		camera.wheelDeltaPercentage = 0.05;
		// scene.activeCamera.target = newMeshes[0];
		// scene.activeCamera.attachControl(canvas, true);


		console.log(newMeshes.length);
		// newMeshes.forEach((mesh) => {
		// 		console.log(mesh.name)
		// });
	});

	scene.onPointerPick = function(evt, pickInfo) {
		if(pickInfo.hit) {
			// console.log(pickInfo.pickedMesh.name)
			// camera.focusOn([pickInfo.pickedMesh], true);
			// console.log('Before: ', camera.getTarget());
			// console.log('Should be: ', pickInfo.pickedMesh.getBoundingInfo().boundingBox.centerWorld);
			let targetPosition = pickInfo.pickedMesh.getBoundingInfo().boundingBox.centerWorld;
			// console.log('1:', camera.position);
			// console.log('2:', targetPosition);
			// console.log('3:', camera.target);
			// console.log('4:', (targetPosition.subtract(camera.target)));
			// console.log('5:', targetPosition.subtract(camera.target).scale(0.1));
			 // + 0 *(targetPosition - camera.target)
			// pickInfo.pickedMesh.showBoundingBox = true;
			// camera.target = targetPosition;
			BABYLON.Animation.CreateAndStartAnimation('anim2', camera, 'position', 10, 2, camera.position, camera.position.add(targetPosition.subtract(camera.target)), 0);
			BABYLON.Animation.CreateAndStartAnimation('anim1', camera, 'target', 10, 2, camera.target, targetPosition, 0);
			// camera.target = (pickInfo.pickedMesh.getBoundingInfo().boundingBox.centerWorld);
		}
	}

	return scene;
}
