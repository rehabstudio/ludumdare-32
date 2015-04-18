WEBPACK_OPTS = -d --progress --colors
SUDO = sudo

help:
	@echo "Usage:"
	@echo "\tmake <command>\n\n\t\tor\n\n\tmake docker cmd=<command>"
	@echo ""
	@echo ""
	@echo "\tCommands:"
	@echo "\t\tsetup - ensure npm installs requirements"
	@echo "\t\tbuild - build the application into the dist folder"
	@echo "\t\tserve - watch files and build on change"
	@echo "\t\tserve - watch files and serve statically on port 8080"

serve: node_modules
	webpack-dev-server $(WEBPACK_OPTS)	

watch: node_modules
	webpack $(WEBPACK_OPTS) --watch

build: node_modules
	webpack $(WEBPACK_OPTS)

# handy alias
setup: node_modules
node_modules: package.json
	npm cache clean;
	$(SUDO) npm install -g webpack;
	$(SUDO) npm install -g webpack-dev-server;
	npm install;
	touch $@



###################
# DOCKER BUILDING #
###################

IMAGE = ludumdare32-build
CONTAINER = ludumdare32-build

# default docker command
cmd=build

DOCKER = docker
DOCKER_NAME = $(CONTAINER)-$(cmd)
DOCKER_OPTS = -it -p 0.0.0.0:8080:8080
DOCKER_VOLS = -v $(CURDIR):/app

DOCKER_RUN = $(DOCKER) run \
			 $(DOCKER_OPTS) \
			 $(DOCKER_VOLS) \
			 --name $(DOCKER_NAME) \
			 $(IMAGE)

PERMISSIONS_FIX = $(DOCKER) run \
				  $(DOCKER_OPTS) --rm \
				  $(DOCKER_VOLS) \
				  $(IMAGE) \
				  chown -R $(shell id -u):$(shell id -g) /app


# Here we check if a container with the correct name already exists and if
# it does we run it again. Otherwise we run a new one and have it call
# `make $(cmd) runner=$(runner)`
docker: .dockerbuild
	@EXISTS=$$(docker ps -a | grep "$(CONTAINER)-$(cmd)" | awk '{ print $$1 }'); \
	if [ $$EXISTS ]; then \
		echo "Reusing existing container..."; \
		$(DOCKER) start -ai $$EXISTS; \
		$(PERMISSIONS_FIX); \
	else \
		echo "Running a new container..."; \
		$(DOCKER_RUN) make $(cmd) SUDO=; \
		$(PERMISSIONS_FIX); \
	fi

docker-shell: .dockerbuild 
	@$(DOCKER) run \
		$(DOCKER_OPTS) --rm \
		$(DOCKER_VOLS) \
		$(IMAGE) \
		bash

.dockerbuild: Dockerfile
	@make docker-clean;
	@$(DOCKER) build -t $(IMAGE) .
	@touch $@;

docker-clean:
	@-$(DOCKER) kill \
		$(shell docker ps -a | grep $(CONTAINER) | awk '{print $$1}')
	@$(DOCKER) rm \
		$(shell docker ps -a | grep $(CONTAINER) | awk '{print $$1}')

# makefile ettiquette; mark rules without on-disk targets as PHONY
.PHONY: help setup docker build watch serve
.DEFAULT: help
